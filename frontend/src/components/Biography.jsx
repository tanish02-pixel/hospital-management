import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl } alt="aboutImg"/>
      </div>
      <div className='banner'>

<p>Biography</p> 
<h3>Who We Are</h3>
<p>
Sukoon Medical Institute is a modern hospital management system built to deliver efficient, patient-focused healthcare through smart digital solutions.
</p>

<p>
Our platform connects patients, doctors, and administrators on a single system for smooth appointment scheduling and care management.
</p>

<p>
We focus on making healthcare simple, accessible, and reliable for everyone.
</p>

<p>
Doctors and hospital staff use Sukoon’s admin panel to manage appointments, review patient details, and provide timely medical care.
</p>

<p>
Patients can easily book appointments, track consultations, and stay informed throughout their treatment journey.
</p>

<p>
At Sukoon, we aim to create a calm, organized, and trustworthy healthcare experience.
</p>


</div>
</div>

  )
}

export default Biography