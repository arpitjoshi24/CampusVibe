import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Addevent() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    eventName: '',
    eventDesc: '',
    eventDate: '',
    venue: '',
    eventMode: '',
    organizer: '',
    bannerImage: null,
  })
  const [imagePreview, setImagePreview] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, bannerImage: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to create an event!')
        navigate('/login')
        return
      }

      // ✅ Prepare multipart form data
      const formDataToSend = new FormData()
      formDataToSend.append('eventName', formData.eventName)
      formDataToSend.append('eventDesc', formData.eventDesc)
      formDataToSend.append('eventDate', formData.eventDate)
      formDataToSend.append('venue', formData.venue)
      formDataToSend.append('eventMode', formData.eventMode)
      formDataToSend.append('organizer', formData.organizer)
      if (formData.bannerImage) {
        formDataToSend.append('banner', formData.bannerImage)
      }

      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add event')
      }

      alert('🎉 Event added successfully!')
      setFormData({
        eventName: '',
        eventDesc: '',
        eventDate: '',
        venue: '',
        eventMode: '',
        organizer: '',
        bannerImage: null,
      })
      setImagePreview('')
      setStep(1)
      navigate('/') // redirect to homepage after success
    } catch (error) {
      console.error('Error adding event:', error)
      alert(error.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-6'>
      <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 w-full max-w-2xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Create New Event
          </h2>
          <p className='text-gray-400 mt-2'>Fill in the details to create your event</p>

          {/* Progress Steps */}
          <div className='flex justify-center mt-6'>
            <div className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 mx-2 ${
                  step >= 2
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/10'
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                2
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Event Name</label>
                  <input
                    type='text'
                    name='eventName'
                    value={formData.eventName}
                    onChange={handleChange}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200'
                    placeholder='Enter event name'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Event Date</label>
                  <input
                    type='date'
                    name='eventDate'
                    value={formData.eventDate}
                    onChange={handleChange}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors duration-200'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Venue</label>
                  <input
                    type='text'
                    name='venue'
                    value={formData.venue}
                    onChange={handleChange}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200'
                    placeholder='Enter venue'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Event Mode</label>
                  <select
                    name='eventMode'
                    value={formData.eventMode}
                    onChange={handleChange}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors duration-200'
                    required
                  >
                    <option value='' className='bg-slate-800'>Select Mode</option>
                    <option value='Online' className='bg-slate-800'>Online</option>
                    <option value='Offline' className='bg-slate-800'>Offline</option>
                    <option value='Hybrid' className='bg-slate-800'>Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-gray-300 font-medium mb-2'>Event Description</label>
                <textarea
                  name='eventDesc'
                  value={formData.eventDesc}
                  onChange={handleChange}
                  rows='4'
                  className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200'
                  placeholder='Enter event details...'
                  required
                />
              </div>

              <div className='flex justify-end pt-4'>
                <button
                  onClick={handleNext}
                  className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105'
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className='space-y-6'>
                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Organizer</label>
                  <input
                    type='text'
                    name='organizer'
                    value={formData.organizer}
                    onChange={handleChange}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200'
                    placeholder='Enter organizer name'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-300 font-medium mb-2'>Banner Image</label>
                  <input
                    type='file'
                    name='bannerImage'
                    onChange={handleImageChange}
                    accept='image/*'
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors duration-200'
                  />
                  {imagePreview && (
                    <div className='mt-3 p-3 bg-white/5 rounded-xl border border-white/10'>
                      <p className='text-gray-400 text-sm mb-2'>Banner Preview:</p>
                      <img
                        src={imagePreview}
                        alt='Banner preview'
                        className='w-full h-32 object-cover rounded-lg'
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className='flex justify-between pt-6'>
                <button
                  onClick={handlePrev}
                  className='bg-white/10 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/10'
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className={`${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  } text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105`}
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
