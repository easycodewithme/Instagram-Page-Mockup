/* Profile + post data for the judiciarygold clone.
   Post tiles are recreated with CSS (backgrounds + text) from the reference
   screenshot — no external images, so nothing ever breaks. */

const PROFILE = {
  username: "judiciarygold",
  fullName: "Judiciary Gold by Toprankers",
  category: "Education",
  posts: "3,133",
  followers: "109K",
  following: "6",
  bio: [
    "Start your Judiciary journey with Judiciary Gold and let's Crack Judiciary the JGWay ⚡",
    "Leaders in Judiciary Preparation…",
  ],
  link: "tinyurl.com/muhz4b3e",
  linkMore: "and 1 more",
};

const HIGHLIGHTS = [
  { label: "Scholarship T…", icon: "cap" },
  { label: "Judiciary Me…", icon: "scales" },
  { label: "Top Achieve…", icon: "medal" },
  { label: "JG 7+Centres", icon: "pin" },
  { label: "JG Life", icon: "film" },
  { label: "Exam Strategy", icon: "doc" },
];

/* Each post: type controls the corner glyph; `tile` is the recreated cover. */
const POSTS = [
  {
    id: 1, type: "carousel", pinned: true, likes: 4210, comments: 138,
    caption: "The results are out and JudiciaryGold rankers have done it again — top ranks across BPSC-J, RJS, HJS and more. #JGWay",
    tile: { theme: "result", title: "अद्भुत", brand: "JUDICIARYGOLD",
      rows: ["BPSC-J 2024", "RJS 2024", "HJS 2024"], foot: "& many more…" },
  },
  {
    id: 2, type: "carousel", pinned: true, likes: 3890, comments: 96,
    caption: "Selections that speak for themselves — CGPSC, UPPSCJ, DJS & MPCJ toppers mentored at Judiciary Gold.",
    tile: { theme: "result", title: "अद्भुत", brand: "JUDICIARYGOLD",
      rows: ["CGPSC 2024", "UPPSCJ 2022", "DJS 2022", "MPCJ 2021"], foot: "& many more…" },
  },
  {
    id: 3, type: "carousel", pinned: true, likes: 3512, comments: 74,
    caption: "Consistency is the JGWay. Year after year, rank after rank. Your name could be next.",
    tile: { theme: "result", title: "RESULTS", brand: "JUDICIARYGOLD",
      rows: ["5+ in Top 10", "24 Selections", "92 Ranks"], foot: "& many more…" },
  },
  {
    id: 4, type: "reel", plays: "1.2M",
    caption: "Is a live-in relationship equal to marriage? Here's what the Supreme Court actually said. 👩‍⚖️",
    tile: { theme: "portrait-warm", top: "Is Live-In Equal to Marriage",
      sub: "Supreme Court Answers", foot: "watch the full video on channel" },
  },
  {
    id: 5, type: "reel", plays: "312K",
    caption: "AIBE 21 final answer key is out! Here's how to check your responses step by step.",
    tile: { theme: "teal", foot: "AIBE 21", footBig: "final answer key out" },
  },
  {
    id: 6, type: "reel", plays: "88.4K",
    caption: "Small habits, big results. A quick note from our mentor to every aspirant grinding today. 💚",
    tile: { theme: "green" },
  },
  {
    id: 7, type: "carousel", badge: "01 / 07", likes: 6120, comments: 244,
    caption: "Why do so many young lawyers quit? The answer lies in three career stages. Swipe through 👉",
    tile: { theme: "sepia", counter: "01/07", serif: "Why Do So Many Young Lawyers Quit?",
      sub: "The answer lies in three career stages." },
  },
  {
    id: 8, type: "reel", plays: "2.4M",
    caption: "The missing link that failed a ₹6,695 crore project — and the law behind who pays. 🚧",
    tile: { theme: "rubble", big: "MISSING LINK", accent: "FAILED?", tag: "₹6,695 CRORE PROJECT" },
  },
  {
    id: 9, type: "reel", plays: "540K",
    caption: "Hindi in the South, Sanskrit in the North — is CBSE's 3-language policy legal? ⚖️",
    tile: { theme: "law-dark", small: "Hindi in the South. Sanskrit in the North.",
      serif: "Is CBSE's 3-LANGUAGE POLICY LEGAL?" },
  },
  {
    id: 10, type: "reel", plays: "76.1K",
    caption: "3 years of success at Judiciary Gold, Indore! Thank you for trusting the JGWay. 🎂",
    tile: { theme: "cake", foot: "3 Years of Success", footSub: "JUDICIARY GOLD INDORE" },
  },
  {
    id: 11, type: "reel", plays: "1.1M",
    caption: "Interviewer: How was your Haryana ADA exam? Me: … you already know. 😅",
    tile: { theme: "interview", top: "INTERVIEWER: HOW WAS YOUR HARYANA ADA EXAM?", me: "ME:" },
  },
  {
    id: 12, type: "reel", plays: "1.8M",
    caption: "No lawyer for the accused? That can cost ₹5 lakh. Here's the right every accused has. ⚖️",
    tile: { theme: "fire", big: "NO LAWYER", accent: "FOR ACCUSED?", tag: "₹5 LAKH PENALTY" },
  },
  {
    id: 13, type: "reel", plays: "410K",
    caption: "JG is giving a MASSIVE price drop on batches — grab your seat before it's gone. 📉",
    tile: { theme: "city", label: "JG IS GIVING A MASSIVE PRICE DROP ON BATCHES" },
  },
  {
    id: 14, type: "reel", plays: "63.2K",
    caption: "Behind the scenes at Judiciary Gold — mentorship that actually listens.",
    tile: { theme: "office" },
  },
  {
    id: 15, type: "reel", plays: "129K",
    caption: "Know your faculties — Ep. 2 with Ayush sir. The people behind your prep. ✍️",
    tile: { theme: "office-warm", hand: "Ayush sir", tab: "know your faculties", ep: "EP. 2" },
  },
  {
    id: 16, type: "reel", plays: "54.7K",
    caption: "A day in the life at the Judiciary Gold campus.",
    tile: { theme: "office-beige" },
  },
  {
    id: 17, type: "reel", plays: "980K",
    caption: "D.Y. Chandrachud shares his thoughts on advocacy — a must-watch for every aspirant.",
    tile: { theme: "podcast", foot: "D.Y. Chandrachud shares", footSub: "his thoughts on advocacy" },
  },
  {
    id: 18, type: "reel", plays: "141K",
    caption: "Judiciary Gold Jaipur — offline batch enrollment is now open. Seats filling fast!",
    tile: { theme: "maroon", label: "JUDICIARY GOLD JAIPUR", labelBig: "OFFLINE BATCH ENROLL NOW" },
  },
  {
    id: 19, type: "reel", plays: "97.5K",
    caption: "Free webinar — Rajasthan APO 2026: preparation strategy & selection roadmap. 27th June, 6:30 PM.",
    tile: { theme: "webinar", small: "Webinar on", serif: "RAJASTHAN APO 2026: PREPARATION STRATEGY & SELECTION ROADMAP", when: "27th June · 6:30 PM" },
  },
  {
    id: 20, type: "reel", plays: "112K",
    caption: "Know your faculties #Ep.1 — meet Chinmay Pandey.",
    tile: { theme: "navy-arc", big: "Know your", accent: "faculties", ep: "#Ep.1", name: "Chinmay Pandey" },
  },
];

/* Sample accounts used for followers / following / suggestions / search. */
const ACCOUNTS = [
  { u: "toprankers", n: "Toprankers", c: "#c0392b", v: true, sub: "Followed by legaledge_official" },
  { u: "legaledge_official", n: "LegalEdge by Toprankers", c: "#8e44ad", v: true, sub: "Followed by toprankers" },
  { u: "judiciary_aspirants", n: "Judiciary Aspirants Hub", c: "#16a085", sub: "Judiciary Aspirants Hub" },
  { u: "law_prep_daily", n: "Law Prep Daily", c: "#2980b9", sub: "Daily law updates" },
  { u: "clat_toppers", n: "CLAT Toppers", c: "#d35400", sub: "Followed by law_prep_daily" },
  { u: "the_law_gazette", n: "The Law Gazette", c: "#27ae60", sub: "News · Media" },
  { u: "advocate.diaries", n: "Advocate Diaries", c: "#c0392b", sub: "Life at the bar" },
  { u: "bare_act_buddy", n: "Bare Act Buddy", c: "#7f8c8d", sub: "Bare acts, simplified" },
  { u: "mains_answer_writing", n: "Mains Answer Writing", c: "#e67e22", sub: "Answer writing practice" },
  { u: "judgment_of_the_day", n: "Judgment of the Day", c: "#2c3e50", sub: "One judgment daily" },
  { u: "aspirant.motivation", n: "Aspirant Motivation", c: "#9b59b6", sub: "Keep going 💪" },
  { u: "pcs_j_notes", n: "PCS-J Notes", c: "#1abc9c", sub: "Free notes & PYQs" },
];

const NOTIFICATIONS = [
  { u: "toprankers", text: "liked your reel.", time: "2h", type: "like" },
  { u: "legaledge_official", text: "started following you.", time: "5h", type: "follow" },
  { u: "clat_toppers", text: "commented: This is so helpful! 🙌", time: "1d", type: "comment" },
  { u: "law_prep_daily", text: "mentioned you in a comment.", time: "1d", type: "mention" },
  { u: "pcs_j_notes", text: "and 24 others liked your post.", time: "2d", type: "like" },
  { u: "advocate.diaries", text: "started following you.", time: "3d", type: "follow" },
  { u: "mains_answer_writing", text: "sent you a message.", time: "4d", type: "message" },
];

const COMMENT_POOL = [
  { u: "clat_toppers", t: "This is exactly what I needed today 🙏", likes: 42 },
  { u: "pcs_j_notes", t: "Sir please make a video on the Evidence Act too", likes: 18 },
  { u: "advocate.diaries", t: "JGWay never disappoints 🔥", likes: 76 },
  { u: "law_prep_daily", t: "Sharing this with my whole batch right now", likes: 9 },
  { u: "aspirant.motivation", t: "Legends only 👑", likes: 120 },
  { u: "mains_answer_writing", t: "Can you cover the 2024 amendments next?", likes: 5 },
  { u: "bare_act_buddy", t: "Bookmarked ✅ thank you team", likes: 31 },
  { u: "judgment_of_the_day", t: "The clarity in this is unmatched 👏", likes: 54 },
];
