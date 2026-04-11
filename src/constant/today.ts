export const todayBn = (() => {
    const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
    ];
    const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];
    const now = new Date();
    const tobn = (n: number) =>
        n
            .toString()
            .split("")
            .map((d) => "০১২৩৪৫৬৭৮৯"[+d])
            .join("");
    return `${days[now.getDay()]}, ${tobn(now.getDate())} ${months[now.getMonth()]
        } ${tobn(now.getFullYear())}`;
})();