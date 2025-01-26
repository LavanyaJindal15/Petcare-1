document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll(".number");

    const animateCount = (entry) => {
        const number = entry.target;
        const target = +number.getAttribute("data-target");
        const speed = 200; // Lower is faster

        const updateCount = () => {
            const current = +number.innerText;
            const increment = Math.ceil(target / speed);

            if (current < target) {
                number.innerText = current + increment;
                setTimeout(updateCount, 10);
            } else {
                number.innerText = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    statNumbers.forEach((number) => {
        observer.observe(number);
    });
});
