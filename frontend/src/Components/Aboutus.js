import React from 'react'
import img3 from './images/about1.png'
function Aboutus() {
  return (
    <section className="foundation">
    <div className="foundation-content">
        <div className="foundation-text">
            <h2>About Our Foundation</h2>
            <h3>We Are In A Mission To Help Helpless</h3>
            <p>Our foundation is dedicated to fighting hunger and providing support to those in need. We believe in ensuring that no one goes hungry and everyone has access to healthy and nutritious food.</p>
            <p>Join us in our mission to make a difference in the lives of the helpless. Together, we can provide food and hope to those who need it most.</p>
           
        </div>
        <div className="foundation-images">
            <img src={img3} alt="Foundation" />
        </div>
    </div>
</section>
  )
}

export default Aboutus