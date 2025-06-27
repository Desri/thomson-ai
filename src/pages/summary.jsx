import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSchema } from "../schemas/generate";
import { getMedicalData, postGenerate } from '../services/generate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabPanel from '../components/ui/tabPanel';
import { Tab, Tabs } from '@mui/material';
import { useAuthStore } from '../store/profileStore';

const SummaryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(generateSchema),
  });

  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [dataGenerateSummary, setDataGenerateSummary] = useState();
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset? This will clear all current data'
    );

    if (confirmReset) {
      reset();
      setDataGenerateSummary('')
    } else {
      console.log(`Penghapusan user "${selectedData.name}" dibatalkan.`);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dataGenerateSummary);
      alert('Summary copied to clipboard!');
    } catch (err) {
      alert('Failed to copy summary.');
      console.error('Copy failed:', err);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true)
    const ta_number = data.ta_number
    getMedicalData({ ta_number })
    .then((res) => {
      if (res.success) {
        const payload = {
          ta_number: data.ta_number,
          summary_type: data.summary_type,
          discharge_summary: '',
          additional_prompt: data.additional_prompt,
          previous_summary: '',
          doctor_notes: res.data.doctor_notes,
          lab_results: res.data.lab_results,
          med_admin: res.data.med_admin,
          medication: res.data.medication,
          radiology: res.data.radiology
        };
        postGenerate({ payload })
        .then((response) => {
          setLoading(false)
          setDataGenerateSummary(response.data.summary)
        })
        .catch((err) => {
          setLoading(false)
          if (err.status === 401) {
            logout();
            navigate('/auth/login');
          }
          showErrorToast(err.message);
        })
      }
      
    })
    .catch((err) => {
      setLoading(false)
      if (err.status === 401) {
        logout();
        navigate('/auth/login');
      }
      showErrorToast(err.message);
    })
  };

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-3">
      <section className="bg-white rounded-lg shadow-sm p-6 w-full mb-5">
        <h2 className="text-[#2a6eb8] font-semibold text-lg mb-4 select-none">
          Generate Medical Summary
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="ta_number"className="block text-gray-900 font-semibold mb-1 select-none">
              TA Number
            </label>
            <input
              type="text"
              id="ta_number"
              {...register('ta_number')}
              name="ta_number"
              placeholder="Enter TA Number (e.g., 12345)"
              className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            />
            {errors.ta_number && <p className="text-red-500 text-xs mt-1">{errors.ta_number.message}</p>}
          </div>

          <div>
            <label htmlFor="summary_type" className="block text-gray-900 font-semibold mb-1 select-none">
              Summary Type
            </label>
            <select
              {...register('summary_type')}
              id="summary_type"
              name="summary_type"
              className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="">Select Summary</option>
              <option value="clinical">Clinical Summary</option>
              <option value="discharge">Discharge Summary</option>
            </select>
            {errors.summary_type && <p className="text-red-500 text-xs mt-1">{errors.summary_type.message}</p>}
          </div>

          <div>
            <label htmlFor="additional-instructions" className="block text-gray-900 font-semibold mb-1 select-none">
              Additional Instructions (Optional)
            </label>
            <textarea
              id="additional-instructions"
              name="additional-instructions"
              {...register('additional_prompt')}
              rows="3"
              placeholder="Enter any specific instructions for the AI summary generation..."
              className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className={`${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2a6eb8] cursor-pointer'
              } text-white font-semibold px-6 py-2 rounded hover:bg-[#4d8fd4] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Generate with AI'}
            </button>
            <button
              type="button"
              className="border border-blue-700 cursor-pointer text-blue-700 font-normal px-6 py-2 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </section>
      
      {dataGenerateSummary && (
        <section className="bg-white rounded-lg shadow-sm p-6 w-full">
          <h2 className="text-[#2a6eb8] font-semibold text-lg mb-4 select-none">
            Discharge Summary
          </h2>

          <Tabs value={value} onChange={handleChange}>
            <Tab label="Summary" />
            <Tab label="Source Data" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <div className="p-4 rounded-md border border-solid border-[#dddddd]">
              <div className="summary-content text-black">
                {dataGenerateSummary}
              </div>
            </div>

            <div className='my-5'>
              <label htmlFor="additional-instructions" className="block text-gray-900 font-semibold mb-1 select-none">
                Feedback/Instructions for Regeneration
              </label>
              <textarea
                id="discharge_summary"
                name="discharge_summary"
                {...register('discharge_summary')}
                rows="3"
                placeholder="Enter feedback or instructions to regenerate the summary..."
                className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="bg-[#28a745] cursor-pointer text-white font-semibold px-6 py-2 rounded hover:bg-[#4d8fd4] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                onClick={handleCopy}
              >
                Copy Summary
              </button>
              <button
                type="submit"
                className="bg-[#2a6eb8] cursor-pointer text-white font-semibold px-6 py-2 rounded hover:bg-[#4d8fd4] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                onClick={handleSubmit(onSubmit)}
              >
                Regenerate
              </button>
              <button
                type="reset"
                className="border border-blue-700 cursor-pointer text-blue-700 font-normal px-6 py-2 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="bg-[#f5f9ff] p-4 mb-5 mt-4 rounded-lg" id="summaryMeta">
              <div className="mb-6">
                <div className="text-[#2a6eb8] font-semibold text-base">Case sheet</div>
                <p className="text-[#212529]">Patient admitted with acute chest pain. ECG shows normal sinus rhythm. No ST elevation. Chest pain described as sharp, substernal, 8/10 severity.</p>
              </div>
              <div className="mb-4">
                <div className="text-[#2a6eb8] font-semibold text-base">Inpatient Discharge Summary</div>
                <p className="text-[#212529]">Patient showing improvement. Pain reduced to 3/10. Vital signs stable. Plan for discharge tomorrow with cardiology follow-up.</p>
              </div>
            </div>
            
            <div className='mb-5'>
              <h2 className='text-black font-semibold mb-3'>
                Labs Results
              </h2>
              <div className='flex itemms-center gap-x-4 text-black'>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Troponin I <span className='bg-[#28a7451a] text-[#28a745] rounded-xl text-xs px-2 py-0.5'>Normal</span>
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Result:</strong> 0.02 ng/mL
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Normal Range:</strong> 0.04
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Date:</strong> 6/5/2025
                  </p>
                </div>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      CK-MB <span className='bg-[#dc35451a] text-[#dc3545] rounded-xl text-xs px-2 py-0.5'>Abnormal</span>
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Result:</strong> 0.02 ng/mL
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Normal Range:</strong> 0.04
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Date:</strong> 6/5/2025
                  </p>
                </div>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Total Cholesterol <span className='bg-[#dc35451a] text-[#dc3545] rounded-xl text-xs px-2 py-0.5'>Abnormal</span>
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Result:</strong> 0.02 ng/mL
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Normal Range:</strong> 0.04
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Date:</strong> 6/5/2025
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-5'>
              <h2 className='text-black font-semibold mb-3'>
                Radiology Reports
              </h2>
              <div className="bg-[#f5f9ff] p-4 mb-5 mt-4 rounded-lg" id="summaryMeta">
                <div className="mb-6">
                  <div className="text-[#2a6eb8] font-semibold text-base">Report - 6/5/2025</div>
                  <p className="text-[#212529]">Chest X-ray shows clear lung fields with no acute cardiopulmonary abnormalities. Heart size normal.</p>
                </div>
                <div className="mb-4">
                  <div className="text-[#2a6eb8] font-semibold text-base">Report - 6/5/2025</div>
                  <p className="text-[#212529]">ECG: Normal sinus rhythm at 75 bpm. No ST segment elevation or depression. No Q waves.</p>
                </div>
              </div>
            </div>

            <div className='mb-5'>
              <h2 className='text-black font-semibold mb-3'>
                Medications
              </h2>
              <div className='flex itemms-center gap-x-4 text-black'>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Aspirin
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Dose:</strong> 325 mg
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Route:</strong> PO
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Frequency:</strong> DAILY
                  </p>
                </div>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Atorvastatin
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Dose:</strong> 40 mg
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Route:</strong> PO
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Frequency:</strong> HS
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-5'>
              <h2 className='text-black font-semibold mb-3'>
                Medication Administration
              </h2>
              <div className='flex itemms-center gap-x-4 text-black'>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Aspirin 325mg PO DAILY
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Activity:</strong> administer
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Type:</strong> med
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Administered Dose:</strong> 325 mg
                  </p>
                </div>
                <div className='bg-[#f5f9ff] p-5 rounded-lg w-64'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-[#2a6eb8]'>
                      Normal Saline 50ml IV STAT
                    </h3>
                  </div>
                  <p>
                    <strong className='text-[#212529]'>Activity:</strong> administer
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Type:</strong> iv
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Administered Dose:</strong> 50 ml
                  </p>
                  <p>
                    <strong className='text-[#212529]'>Reason:</strong> notind
                  </p>
                </div>
              </div>
            </div>

          </TabPanel>
        </section>
      )}
      
    </main>
  );
};

export default SummaryPage;