import React, { useState } from "react";
import "./styles/accordion.css";

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const accordionItems = [

        {
            title: "How It Works",
            content:
                "AnnSeva is a platform where donors can donate surplus food, and recipients such as old age homes or organizations in need can request it. Volunteers facilitate the transportation of food to the recipients, while administrators ensure smooth operations.",
        },
        {
            title: "Why Choose AnnSeva?",
            content:
                "AnnSeva is built with a focus on user-friendly technology. Features include OTP-based login, a map component for donor-recipient matching, and admin dashboards for monitoring operations. It’s a complete solution to tackle food waste and hunger.",
        },
        {
            title: "For Donors",
            content:
                "As a donor, you can easily list surplus food on our platform to help feed those in need. Simply register as donor, select the type and quantity of food you want to donate and select the organization you want to donate wait for approval of recipient. You can self deliver or request for volunteer to deliver the food.",
        },
        {
            title: "For Recipients",
            content:
                "Recipients can request food assistance based on availability and location. Recipients can view available food donations, select the desired food items, and wait for a volunteer to deliver the food to their location."
        },

        {
            title: "For Volunteers",
            content:
                "Volunteers play a crucial role in transporting food from donors to recipients. You can sign up through the platform as volunteer, view current donations accept one and start transporting it to recipient.",
        },
    ];

    return (
        <div className="accordion-container">
            <h1 className="title">About AnnSeva</h1>
            <div className="accordion">
                {accordionItems.map((item, index) => (
                    <div
                        key={index}
                        className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                    >
                        <div
                            className="accordion-header"
                            onClick={() => toggleAccordion(index)}
                        >
                            {item.title}
                        </div>
                        <div
                            className="accordion-content"
                            style={{
                                maxHeight: activeIndex === index ? "200px" : "0",
                                opacity: activeIndex === index ? "1" : "0",
                            }}
                        >
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
