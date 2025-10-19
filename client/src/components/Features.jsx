const features = () => {
    const featuresData = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>),
            title: "Smart Practice Modes",
            description: "Choose between Study Mode (see answers instantly) or Test Mode. Perfect for both learning and revision.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>),
            title: "Focused Week Testing",
            description: "Customize your test by selecting specific weeks or topics to revise only what matters most to you.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /><rect x="3" y="14" width="7" height="7" rx="1" /><circle cx="17.5" cy="17.5" r="3.5" /></svg>),
            title: "Review Answers",
            description: "Review all answers for the given questions to improve memorization.",
        }
    ];
    return (
        <div
  className="pt-0 pb-40">
            <div class="text-center">
                <p class="text-center font-medium text-purple-400 px-10 py-1.5 rounded-full bg-purple-950 border border-purple-800 w-max mx-auto">Features</p>
                <h2 class="text-3xl font-semibold text-center mx-auto mt-4 text-white">Ready, Set, Quiz!</h2>
                <p class="mt-2 px-2 text-slate-300 max-w-xl mx-auto">
                    From questions to answers — everything you need to learn, practice, and ace your way to success.
                </p>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <div key={index} className={`hover:-translate-y-0.5 transition duration-300 ${index === 1 ? 'p-px rounded-[13px] bg-gradient-to-br from-[#9544FF] to-[#223B60]' : ''}`}>
                        <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full">
                            {feature.icon}
                            <h3 className="text-base font-medium text-white">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 line-clamp-2 pb-4">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default features