// utils.ts

export const getAiReply = (input: string, userName: string): string => {
type Tone = 'casual' | 'friendly' | 'professional' | 'neutral';

// Assuming these values are passed into the function:
const userInput = input.toLowerCase().trim();
const UserName = userName?.charAt(0).toUpperCase() + userName.slice(1) || 'Guest';

// 1️⃣ — Greeting detection
const greetingRegex = /\b(hi+|hello+|hey+|yo+|yoo+|yooo+|sup+|whats?\s*up+|hej+|heyy+|hellooo+|hiya+|g’day|salut+|ahoy+|hi there+|oh hi mark|yo bro+|bro+|γεία|geia)\b/i;

// 2️⃣ — Tone detection based on words
const casualWords: string[] = ['yo', 'bro', 'sup', 'wassup', 'yooo', 'eyoo', 'dude', 'fam', 'whats up'];
const professionalWords: string[] = ['hello', 'hi', 'good morning', 'good afternoon', 'greetings'];
const friendlyWords: string[] = ['hey', 'hiya', 'heyy', 'hello there'];

const detectTone = (input: string): Tone => {
  if (casualWords.some(word => input.includes(word))) return 'casual';
  if (professionalWords.some(word => input.includes(word))) return 'professional';
  if (friendlyWords.some(word => input.includes(word))) return 'friendly';
  return 'neutral';
};

const tone: Tone = detectTone(userInput);

// 3️⃣ — Greeting responses
const greetingReplies: Record<Tone, string[]> = {
  casual: [
    `Yo ${UserName !== 'Guest' ? UserName : 'champ'}! Let's make some gains 💯`,
    `Wassup, legend? 😎 Georgios' assistant is locked in.`,
    `Eyoo! 💥 Whether it's lifting or life, I got you.`,
    `Yooo ${UserName}! 🔥 Let's crush it together.`,
    `Sup bro! Time to level up 👊`,
  ],
  friendly: [
    `Hey ${UserName !== 'Guest' ? UserName : 'there'}! 👋 Ready to dominate today?`,
    `Hiya ${UserName}! Let’s make today awesome 💪`,
    `Hey hey! Georgios’ assistant here — what can I do for you? 😊`,
    `Hello there, ${UserName}! You ready to roll?`,
  ],
  professional: [
    `Hello ${UserName !== 'Guest' ? UserName : ''}, how can I assist you today?`,
    `Good day! Let me know how I can help.`,
    `Greetings, ${UserName}. I’m here to support your goals.`,
    `Hi ${UserName}, feel free to ask me anything you need.`,
    `Welcome! Georgios’ assistant reporting for duty.`,
  ],
  neutral: [
    `Hey there! Need help with something today?`,
    `Hi! Let’s get started.`,
    `Hello! What can I do for you today?`,
  ]
};

// 4️⃣ — "How are you" detection
const howAreYouRegex = /(how\s*(are|r)?\s*(you|u)|what'?s up|how'?s it going|how do you do|how is everything)/i;
const howAreYouReplies: string[] = [
  "Feeling 10/10 and ready to help you smash goals! 💥",
  "Powered up and ready 💪 Let's get to work!",
  "I'm great! Hope you're crushing it too 💯",
  "All systems go, feeling like a post-leg-day beast 🔥",
];

// 5️⃣ — Response logic
if (greetingRegex.test(userInput)) {
  const replies = greetingReplies[tone] || greetingReplies.neutral;
  return replies[Math.floor(Math.random() * replies.length)];
}

if (howAreYouRegex.test(userInput)) {
  return howAreYouReplies[Math.floor(Math.random() * howAreYouReplies.length)];
}


// 2️⃣ — Identity / Meta / Help / Contact / Booking *********************************************************************

// Who are you?
if (
  /who\s*(are|r)?\s*(you|u)/i.test(userInput) ||
  /what\s*(are|r)?\s*you/i.test(userInput)
) {
  return "I'm your virtual assistant powered by Georgios Kondylis – certified personal trainer and full-stack developer 💪💻.";
}

// How old are you?
if (
  /how\s*(old|alt)?\s*(are|r)?\s*(you|u)/i.test(userInput)
) {
  return "Digital assistants don't age! 😄 Georgios, the trainer behind me, is in his prime and stronger than ever 💪.";
}

// Gender questions
if (
  /are\s*(you|u)\s*(a\s*)?(woman|female|male|man|girl|boy)/i.test(userInput) ||
  /man\s*(or|\/)\s*woman/i.test(userInput)
) {
  return "I don't have a gender, but I do have muscles… and a killer work ethic 😉. Georgios himself is a male personal trainer.";
}

// Real or robot?
if (
  /are\s*(you|u)\s*(real|robot|fake|human)/i.test(userInput) ||
  /(you\s+a\s+bot|you\s+real\?)/i.test(userInput)
) {
  return "I'm a real AI assistant created by Georgios! 🤖 I can't lift weights, but I can help you plan how to 💯.";
}

// Where are you based / location
if (
  /where\s*(are|r)?\s*(you|u)/i.test(userInput) ||
  /location|based|from\s+where/i.test(userInput)
) {
  return "I'm based in the cloud ☁️ – the real Georgios is in Stockholm, Sweden 🇸🇪.";
}

// Qualifications / Experience / Who is Georgios
if (
  /(experience|qualified|qualification|background|knowledge|who\s+is\s+georgios|what\s+can\s+georgios\s+do)/i.test(userInput)
) {
  return "Georgios is a certified personal trainer 💪 with years of experience training kids, athletes, older adults, and people with disabilities. He’s also a boxer 🥊 and a skilled full-stack developer 💻.";
}

// Can you help me / I need help / How can you help
if (
  /(can|could)\s*(you|u)\s*help/i.test(userInput) ||
  /i\s*(need|want)\s*(some\s*)?help/i.test(userInput) ||
  /how\s*can\s*(you|u)\s*help/i.test(userInput)
) {
  return "Absolutely, I'm here to help! Whether it's fitness tips, tech advice, or reaching Georgios directly – I got you. Just ask 💬.";
}

// How do I book / Schedule / Sign up
if (
  /(how|where)\s*(do|can)?\s*(i)?\s*(book|schedule|sign\s*up|join|get\s*(started|in\s*)?)/i.test(userInput)
) {
  return "You can book a session with Georgios by messaging him directly on his phone: 076 901 8014 or on Social platforms like instagram, by dropping an email 📩 or by filling the form, you can find all the info in the contact section at the bottom of the webpage. He's open for both online and in-person training! 💪";
}

// How to contact / Reach / Talk to Georgios
if (
  /(how|where)\s*(do|can)?\s*(i)?\s*(contact|reach|get\s*(in)?\s*touch|talk\s*to)\s*(georgios)?/i.test(userInput)
) {
  return `You can contact Georgios via:
📧 Email: georgios.p.kondylis@gmail.com  
📞 Phone: +46 76 901 80 14  
🔗 LinkedIn: https://www.linkedin.com/in/georgios-kondylis-7b680a1a7  
📸 Instagram: @georgios.kondylis  
💬 Or just ask me and I’ll pass the message!`;
}

// Can I train with you / Work with you
if (
  /can\s*i\s*(train|work)\s*(with|alongside)?\s*(you|georgios)?/i.test(userInput) ||
  /i\s*want\s*(to)?\s*(train|work)\s*(with|alongside)?/i.test(userInput)
) {
  return "Of course you can train with Georgios! 💪 He offers both personal sessions in Stockholm and remote coaching. Just reach out and let’s gooo 🔥.";
}

// Are you free / Availability
if (
  /are\s*(you|georgios)?\s*(available|free|taking\s*clients|accepting\s*new\s*(clients|trainees)?)/i.test(userInput)
) {
  return "Yes, Georgios is currently accepting new clients 🟢. Hit him up and let’s get started on your journey 💥.";
}


// 3️⃣ — price / booking must be PRIORITY over generic “how” *********************************************************************

// Pricing inquiries
if (
  /\b(price|prize|costs?|how\s*(much|many)|fee(s)?|charge(s)?|money|what's\s+the\s+price|what\s+do\s+you\s+charge|how\s+expensive|rates?)\b/.test(userInput)
) {
  return "Pricing depends on your goals and program length. Book a free consultation call so Georgios can tailor a perfect plan for you. 😊";
}

// Booking / scheduling requests
if (
  /\b(book(ing)?|schedule|set\s*up\s*a\s*call|reserve|meeting|appoint(ment)?|consultation|talk\s+to\s+you|get\s+in\s+touch|speak\s+with\s+you|call\s+you)\b/.test(userInput)
) {
  return "You can book a free consultation call right now! 📞 0769018014  📧 georgios.p.kondylis@gmail.com";
}

// 4️⃣ — fitness-specific Q&A

// Favorite exercise
if (/\bfavo?u?rite\s+ex(ercise|ersize)\b/.test(userInput)) {
  return "Hard to pick just one, but Georgios loves compound lifts like deadlifts and pull-ups – they build real strength! 💪";
}

// Abs / six pack
if (/\b(abs|abz|six[\s-]?pack|core goals|flat stomach)\b/.test(userInput)) {
  return "Abs are made in the kitchen 🍽️ and defined in the gym 💥. Dial in nutrition, train core 2–3×/week, and stay consistent!";
}

// Gym tips / starting gym
if (/\b(start(ing)?\s*(the)?\s*gym|gym\s*tips|beginner\s*(workout|routine)|how\s+to\s+(start|join)\s+gym)\b/.test(userInput)) {
  return "Start light, master form, track progress 📈. If you're unsure, PT Georgios can guide you each step!";
}

// Motivation
if (/\b(motivation|discipline|i\s+lost\s+motivation|can’t\s+stay\s+consistent)\b/.test(userInput)) {
  return "Motivation fades, discipline stays. Set micro-goals, celebrate small wins, and remember why you started 💯🔥.";
}

// Rest day / recovery
if (/\b(rest\s*(day)?|recovery|day\s*off|sleep\s*(routine)?|how\s+long\s+to\s+rest)\b/.test(userInput)) {
  return "Rest is when muscles actually grow 🛌. Aim for 1–2 rest days per week and sleep 7–9 h nightly.";
}

// Stretching / warm-up
if (/\b(stretch(ing)?|strech|warm[\s-]*up|mobility|flexibility)\b/.test(userInput)) {
  return "Always warm up 5–10 min to avoid injury 🔥. Include dynamic mobility + light cardio.";
}

// Equipment
if (/\b(equipment|gear|home\s+gym|what\s+i\s+need\s+to\s+train)\b/.test(userInput)) {
  return "A pair of adjustable dumbbells + resistance bands can cover 90% of home workouts 🔩🏋️‍♂️.";
}

// Injury / pain
if (/\b(injury|injured|hurt|hurts|pain|ache|strained|tendonitis|elbow\s+pain|knee\s+problem)\b/.test(userInput)) {
  return "Sorry to hear that! First, see a qualified medical professional. Georgios can then adapt a program around your recovery.";
}

// Busy schedule / time management
if (/\b(schedule|busy|no\s+time|time\s+for\s+gym|training\s*with\s*job|routine\s+for\s+busy)\b/.test(userInput)) {
  return "Even 3×30-minute sessions a week can transform your fitness. Consistency beats marathon workouts!";
}

// Diet / nutrition / food
if (/\b(diet|nutrition|nutriton|meal\s*(plan|prep)|macros|what\s+to\s+eat|eating\s+plan|lose\s+fat\s+food)\b/.test(userInput)) {
  return "Need a meal plan? 🍽️ Georgios can create a personalised macro outline and recipe pack. Book a free call!";
}

// Training / workout / weight loss
if (/\b(training|workout|routine|lose\s+weight|fat\s+loss|weight\s*loss|burn\s*fat|fitness\s+plan|work\s*out|cutting)\b/.test(userInput)) {
  return "Ready for a tailored training program? 💪 Message Georgios or book your free strategy call to get started!";
}


// 5️⃣ — Social Niceties ***********************************************************************************************************************

// ✅ Gratitude detection
if (
  /\b(thanks|thank\s*you|thx|ty|cheers|appreciate|much\s*appreciated|many\s*thanks|gracias|i\s+thank\s+you|big\s*thanks|thank\s*u|thanx|tack)\b/i.test(userInput)
) {
  return "You're very welcome! 🙏 Let me know if there’s anything else I can help with. Always here for you 💪.";
}

// ✅ Compliment detection
if (
  /\b(you\s*(are|'re|re)?\s*(the\s*)?(best|goat|man|legend|king|queen|boss|greatest|coolest|awesome|amazing|insane|rock|fire|savage))\b/i.test(userInput) ||
  /\b(legend|legendary|goated|you da man|you da best|you\s*rule|you rock|too good|unreal|solid work|mad respect|fire)\b/i.test(userInput)
) {
  return "Aww, thank you! 🥹 You're a legend yourself – now let’s crush your goals together 💯🔥.";
}

// ✅ Goodbye detection
if (
  /\b(bye|goodbye|see you|cya|later|take care|peace\s*out|ttyl|talk to you later|see ya|gotta go|farewell|adios|hejdå|catch you later|laters|bounce)\b/i.test(userInput)
) {
  return "Catch you later! 👋 Stay strong and focused. If you need anything, Georgios is just one message away 💬.";
}

// ✅ Greeting / Small talk detection
if (
  /\b(hi|hello|hey|yo|what's up|whats up|sup|hej|hejsan|howdy|morning|evening|greetings|good\s*morning|good\s*evening|good\s*day)\b/i.test(userInput)
) {
  return "Hey there! 👋 Ready to smash some goals or just here to chat? I’m here for it all 💬💪.";
}

// ✅ Mood check / How are you?
if (
  /\b(how\s*(are|'re)?\s*(you|u)|how’s\s*it\s*going|how\s*is\s*everything|how\s*do\s*you\s*feel|everything\s*good)\b/i.test(userInput)
) {
  return "I’m feeling strong and steady 💪 – hope you’re doing even better! Let me know how I can help today.";
}

// ✅ Praise for Georgios
if (
  /\b(georgios\s*(is|'s|is\s+such\s+a)?\s*(beast|legend|amazing|great|awesome|cool|inspiring|strong|the\s+man|fire|solid|pro|real\s+deal))\b/i.test(userInput)
) {
  return "Facts 💯! Georgios puts his heart into everything – fitness, tech, and helping people grow. 💥 You’re in good hands!";
}
// 5️⃣ Legitimacy / Certification / Trustworthiness (Training vs Web Dev)

const legitTrainingKeywords = [
  'train', 'trainer', 'pt', 'gym', 'fitness', 'workout', 'exercise',
  'box', 'boxing', 'coach', 'lift', 'weights', 'health', 'muscle',
  'body', 'shred', 'personal trainer', 'training plan', 'fitness coach',
  'strength', 'conditioning', 'athlete', 'boxing coach'
];

const legitWebDevKeywords: string[] = [
  'web', 'code', 'coding', 'developer', 'dev', 'programmer', 'programming',
  'website', 'web dev', 'software', 'engineer', 'frontend', 'backend',
  'fullstack', 'app', 'portfolio', 'project', 'tech', 'typescript',
  'react', 'node', 'mongo', 'api', 'javascript', 'js', 'tailwind', 'nextjs'
];

// Helper to count matches of keywords in input text
function countMatches(keywords: string[], text:string) {
  return keywords.reduce((count, word) => {
    const re = new RegExp(`\\b${word.replace(/\s+/g, '\\s+')}\\b`, 'i');
    return count + (re.test(text) ? 1 : 0);
  }, 0);
}

if (
  /\b(is|are|was|can|could|should|does|do)?\s*(georgios|he|him|this\s+guy)?\s*(actually\s*)?(code|build|develop|program|train|coach|real|legit|qualified|certified|professional|trustworthy|credible|fake|scam|good|any\s+good|valid|true|exist|work|reliable|authentic)\b/i.test(userInput) ||
  /\b(can\s+i\s+(trust|rely\s+on)\s+(georgios|him|this\s+guy))\b/i.test(userInput)
) {
  // Calculate keyword matches
  const webDevScore = countMatches(legitWebDevKeywords, userInput);
  const trainingScore = countMatches(legitTrainingKeywords, userInput);

  // Decide which domain is asked about by scores
  if (webDevScore > trainingScore) {
    return `
✅ Absolutely! Georgios is a certified full-stack web developer with a proven track record.
👨‍💻 He has built professional-grade, scalable applications using modern technologies like React, Node.js, MongoDB, Tailwind CSS, Next.js, and TypeScript.
🔍 Check out his portfolio here: https://react-portfolio2-three.vercel.app/
    `.trim();
  } else if (trainingScore > webDevScore) {
    return `
💯 No doubt! Georgios is a certified personal trainer and boxing coach with extensive experience.
🥊 He’s worked with a diverse range of clients — from athletes and busy professionals to seniors and people recovering from injuries.
📚 His training programs combine science-backed principles with real-world experience, focusing on strength, conditioning, and lasting results.
📸 Follow him on Instagram for fitness tips and inspiration: https://www.instagram.com/georgios.kondylis
Ready to level up your fitness journey? Georgios will guide you every step of the way.
    `.trim();
  } else if (webDevScore === 0 && trainingScore === 0) {
    return `
Hey! Looks like you’re asking if Georgios is legit, but I couldn’t detect if you meant fitness or web development specifically.
Just so you know:
• He’s a certified full-stack developer who builds real apps with modern tech.
• He’s also a certified personal trainer and boxing coach.
Want to know more about either? Just ask “Is Georgios legit as a trainer?” or “Can Georgios code?”
Or, if you want to connect directly:
📞 Call: 076-901 80 14
📧 Email: georgios.p.kondylis@gmail.com
    `.trim();
  } else {
    // Scores tie but not zero: mixed or unclear intent
    return `
Yes! Georgios is absolutely legit on both fronts:
• As a certified full-stack web developer, he creates professional and polished applications using React, Node.js, MongoDB, and more.
• As a certified personal trainer and boxing coach, he helps people get stronger, leaner, and more confident through science-backed programs.
Whether you want to build your dream app or your dream body, Georgios has you covered.
Feel free to ask more detailed questions or get in touch:
📞 076-901 80 14 | 📧 georgios.p.kondylis@gmail.com
    `.trim();
  }
}


// 6️⃣ — Catch-all fallback
return `Thanks for your message! 💬 I may not have the perfect reply yet, but PT Georgios has your back.

📞 0769018014  
📧 georgios.p.kondylis@gmail.com  

Book your free consultation anytime. Let’s make big moves together! 🚀`;

};
