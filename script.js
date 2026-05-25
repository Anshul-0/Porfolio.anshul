// typing animation

var typed = new Typed(".typing",{
    strings:["Software Developer","Full Stack Developer","Cloud Enthusiast","Backend Developer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})
// Aside

const nav = document.querySelector(".nav"),
     navList = nav.querySelectorAll("li"),
     totalNavList = navList.length,   
     allSection = document.querySelectorAll(".section"),
     totalSection = allSection.length;
     for(let i=0; i<totalNavList; i++)
     {
        const a= navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            removeBackSection();
            for(let j=0; j<totalNavList; j++)
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    // allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);
            if(window.innerWidth < 1200)
            {
                asideSectionTogglerBtn();
            }
        })
     }
     function removeBackSection()
     {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("back-section");
        }
     }
     function addBackSection(num)
     {
        allSection[num].classList.add("back-section");
     }
     function showSection(element)
     {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
     }
     document.querySelector(".hire-me").addEventListener("click", function()
     {
        const sectionIndex = this.getAttribute("data-section-index");
        // console.log(sectionIndex);
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
     })
     function updateNav(element)
     {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
     }
     const navTogglerBtn = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", () =>
        {
            asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn()
        {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.toggle("open");
            }
        }

// Contact form submission
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    const submitButton = contactForm.querySelector("#contact-submit");
    const feedback = contactForm.querySelector("#contact-feedback");
    const scriptURL = "https://script.google.com/macros/s/AKfycbwFrkI4uA9zYR8lVHInV_voms70pxk8pGKQSzFla71Bmz1zAECrLEHZ0kSm92LpvWUZ/exec";
    let isSubmitting = false;

    const setLoadingState = (isLoading) => {
        if (!submitButton) {
            return;
        }
        submitButton.disabled = isLoading;
        submitButton.classList.toggle("is-loading", isLoading);
        submitButton.textContent = isLoading ? "Sending..." : "Send";
    };

    const toastContainer = document.querySelector("#toast-container");
    const showToast = (message, type) => {
        if (!toastContainer) {
            return;
        }
        const toast = document.createElement("div");
        toast.className = `toast ${type || ""}`.trim();
        toast.textContent = message;
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");
            toast.addEventListener("transitionend", () => toast.remove(), { once: true });
        }, 3000);
    };

    const showFeedback = (message, type) => {
        if (!feedback) {
            return;
        }
        feedback.textContent = message;
        feedback.classList.remove("success", "error");
        if (type) {
            feedback.classList.add(type);
            showToast(message, type);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }

        const formData = new FormData(contactForm);
        const name = (formData.get("name") || "").trim();
        const email = (formData.get("email") || "").trim();
        const subject = (formData.get("subject") || "").trim();
        const message = (formData.get("message") || "").trim();

        if (!name || !email || !subject || !message) {
            showFeedback("Please fill out all fields.", "error");
            return;
        }

        if (!isValidEmail(email)) {
            showFeedback("Please enter a valid email address.", "error");
            return;
        }

        if (!scriptURL || scriptURL === "YOUR_APPS_SCRIPT_WEB_APP_URL") {
            showFeedback("Form is not configured. Please try again later.", "error");
            return;
        }

        isSubmitting = true;
        setLoadingState(true);
        showFeedback("Sending your message...", "");

        try {
            const formPayload = new FormData();
            formPayload.append("name", name);
            formPayload.append("email", email);
            formPayload.append("subject", subject);
            formPayload.append("message", message);

            const response = await fetch(scriptURL, {
                method: "POST",
                body: formPayload
            });

            let result = {};
            try {
                result = await response.json();
            } catch (error) {
                result = {};
            }

            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Submission failed. Please try again.");
            }

            showFeedback("Message sent successfully. Thank you!", "success");
            contactForm.reset();
        } catch (error) {
            showFeedback(error.message || "Something went wrong. Please try again.", "error");
        } finally {
            isSubmitting = false;
            setLoadingState(false);
        }
    });
}
