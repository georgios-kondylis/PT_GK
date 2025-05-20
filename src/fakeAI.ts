// utils.ts

export const getAiReply = (input: string, userName: string): string => {
  const userInput = input.toLowerCase().trim();
  const UserName = userName?.charAt(0).toUpperCase() + userName.slice(1)

  // 1️⃣ — greetings & emotion
  const greetWords = ['hi', 'hello', 'hey', 'yo', 'whats up', 'hej', 'γειά','yoo', 'yoooo', 'yooo', 'bro', 'yo bro', 'hi there', 'oh hi mark'];
  if (greetWords.includes(userInput)) {
    return `Hi ${userName !== 'guest' ? UserName : 'there'}! 👋 How can I assist you today?`;
  }
  if (userInput.includes('how are you')) {
    return "I'm doing great, thanks for asking! 😊 I'm here to help with anything fitness or PT-related.";
  }

// 2️⃣ — identity / meta questions
if (userInput.includes('who are you')) {
  return "I'm your virtual assistant powered by Georgios Kondylis – certified personal trainer and full-stack developer 💪💻.";
}
if (userInput.includes('how old are you')) {
  return "Digital assistants don't age! 😄 Georgios, the trainer behind me, is in his prime and stronger than ever 💪.";
}
if (
  /are you (a )?(woman|female|male|man|girl|boy)/i.test(userInput) ||
  userInput.toLowerCase().includes('man or woman')
) {
  return "I don't have a gender, but I do have muscles… and a killer work ethic 😉. Georgios himself is a male personal trainer.";
}
if (userInput.includes('are you real') || userInput.includes('robot')) {
  return "I'm a real AI assistant created by Georgios! 🤖 I can't lift weights, but I can help you plan how to 💯.";
}
if (userInput.match(/where .*you|location|based/)) {
  return "I'm based in the cloud ☁️ – the real Georgios is in Stockholm, Sweden 🇸🇪.";
}
if (
  userInput.includes('experience') ||
  userInput.includes('qualified') ||
  userInput.includes('knowledge') ||
  userInput.includes('background') ||
  userInput.includes('who is georgios')
) {
  return "Georgios is a certified personal trainer with many years of experience 💪. He has trained, kids, professional athletes, older adults, and individuals with kinetic disabilities. He also has a strong boxing background 🥊 and knows how to adapt training for all levels.";
}

  // 3️⃣ — price / booking must be PRIORITY over generic “how”
  if (
    /(price|cost|how much|fee|money|costs?)/.test(userInput)
  ) {
    return "Pricing depends on your goals and program length. Book a free consultation call so Georgios can tailor a perfect plan for you. 😊";
  }
  if (/(book|schedule|meeting|call)/.test(userInput)) {
    return 'You can book a free consultation call right now! 📞 0769018014  📧 georgios.p.kondylis@gmail.com';
  }

  // 4️⃣ — fitness-specific Q&A
  if (/favo?urite exercise/.test(userInput)) {
    return 'Hard to pick just one, but Georgios loves compound lifts like deadlifts and pull-ups – they build real strength! 💪';
  }
  if (/(abs|six pack)/.test(userInput)) {
    return 'Abs are made in the kitchen 🍽️ and defined in the gym 💥. Dial in nutrition, train core 2-3×/week, and stay consistent!';
  }
  if (/gym tips|start gym/.test(userInput)) {
    return "Start light, master form, track progress 📈. If you're unsure, PT Georgios can guide you each step!";
  }
  if (/motivation/.test(userInput)) {
    return 'Motivation fades, discipline stays. Set micro-goals, celebrate small wins, and remember why you started 💯🔥.';
  }
  if (/rest day|recovery/.test(userInput)) {
    return 'Rest is when muscles actually grow 🛌. Aim for 1-2 rest days per week and sleep 7-9 h nightly.';
  }
  if (/stretch|warm ?up/.test(userInput)) {
    return 'Always warm up 5-10 min to avoid injury 🔥. Include dynamic mobility + light cardio.';
  }
  if (/equipment/.test(userInput)) {
    return 'A pair of adjustable dumbbells + resistance bands can cover 90 % of home workouts 🔩🏋️‍♂️.';
  }
  if (/injury|hurt|pain/.test(userInput)) {
    return 'Sorry to hear that! First, see a qualified medical professional. Georgios can then adapt a program around your recovery.';
  }
  if (/schedule|time|busy/.test(userInput)) {
    return 'Even 3×30-minute sessions a week can transform your fitness. Consistency beats marathon workouts!';
  }
  if (/diet|nutrition|meal/.test(userInput)) {
    return 'Need a meal plan? 🍽️ Georgios can create a personalised macro outline and recipe pack. Book a free call!';
  }
  if (/training|workout|lose weight|weight loss/.test(userInput)) {
    return 'Ready for a tailored training program? 💪 Message Georgios or book your free strategy call to get started!';
  }

  // 5️⃣ — social niceties
  if (/thanks|thank you|appreciate/.test(userInput)) {
    return 'You’re very welcome! 😊 Let me know if there’s anything else I can help with.';
  }
  if (/you (are|\'re) (the )?best|you rock|legend/.test(userInput)) {
    return 'Aww, thank you! 😊 You’re awesome too! Keep smashing those goals! 💯🔥';
  }
  if (/bye|goodbye|see you/.test(userInput)) {
    return 'Take care! 👋 Hope to chat again soon. Remember, Georgios is just a call away!';
  }

  // 6️⃣ — catch-all (after every specific case)
  return 'Thanks for your message! 💬 This AI is limited, but PT Georgios is always happy to help directly.\n\n📞 0769018014\n📧 georgios.p.kondylis@gmail.com\n\nBook your free consultation anytime.';
};
