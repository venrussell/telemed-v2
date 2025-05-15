import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Message {
    text: string;
    isUser: boolean;
    isDistress?: boolean; // New property to indicate a distress message
}

const SYMPTOM_KEYWORDS = [
    'fever', 'headache', 'tired', 'fatigue', 'cough', 'sore throat', 'sad', 'anxious', 'nausea', 'dizziness',
    'cold', 'abdominal pain', 'acne', 'allergies', 'anemia', 'anxiety', 'arthritis', 'asthma', 'back pain', 'bleeding gums',
    'blisters', 'bloating', 'blurred vision', 'body aches', 'breast pain', 'breathlessness', 'bruising easily', 'burning sensation',
    'chest pain', 'chills', 'cold sores', 'constipation', 'cramps', 'cyanosis', 'cystitis', 'cysts', 'diarrhea', 'dry eyes',
    'earache', 'eczema', 'eye redness', 'fainting', 'flatulence', 'frequent urination', 'gas', 'gastritis', 'gout', 'hair loss',
    'halitosis', 'heart palpitations', 'heartburn', 'hemorrhoids', 'hiccups', 'hoarseness', 'hot flashes', 'hyperhidrosis', 'hypertension',
    'hypoglycemia', 'hypotension', 'indigestion', 'insomnia', 'itching', 'joint pain', 'jaundice', 'knee pain', 'leg cramps',
    'lightheadedness', 'loss of appetite', 'low back pain', 'low energy', 'memory loss', 'menstrual cramps', 'mouth ulcers', 'muscle pain',
    'muscle weakness', 'nasal congestion', 'neck pain', 'night sweats', 'nosebleeds', 'numbness', 'palpitations', 'pelvic pain',
    'rash', 'runny nose', 'sciatica', 'shortness of breath', 'sinus pressure', 'skin dryness', 'sleepiness', 'sneezing', 'stomach ache',
    'stress', 'swelling', 'throat pain', 'toothache', 'urinary urgency', 'vomiting', 'weight gain', 'weight loss', 'wheezing', 'wrinkles', 'yeast infection'
];

const SYMPTOM_RESPONSES: { [key: string]: string } = {
    fever: `It sounds like you may have a fever. This could be a sign of an infection such as the flu or a viral illness. Try taking paracetamol (Tylenol) to reduce your temperature. Stay hydrated, rest as much as possible, and monitor your symptoms.`,
    headache: `Headaches can stem from stress, dehydration, or lack of sleep. Try drinking water, resting in a dark quiet room, or taking an over-the-counter medication such as ibuprofen. Avoid long screen exposure.`,
    tired: `Fatigue or feeling tired can result from poor sleep, anemia, stress, or even illness. Ensure you're getting enough rest, eating a nutritious diet, and drinking water. If persistent, consult a doctor.`,
    cough: `A cough might be due to a viral infection, allergies, or throat irritation. Drink warm fluids like ginger tea with honey. Over-the-counter lozenges or cough suppressants may help. See a doctor if it lasts more than a week.`,
    'sore throat': `Sore throats are usually caused by viral infections. Try gargling warm salt water, drinking warm teas, or using throat lozenges. Pain relievers like ibuprofen can also reduce discomfort.`,
    sad: `Feeling sad or anxious can happen to anyone. Try journaling your thoughts, talking to someone you trust, or practicing mindfulness. If this persists, consider speaking to a mental health professional.`,
    nausea: `Nausea can be caused by motion sickness, digestive issues, or stress. Ginger tea or peppermint can soothe your stomach. Eat bland foods and avoid strong smells.`,
    dizziness: `Dizziness might be due to dehydration, low blood sugar, or inner ear issues. Sit or lie down until it passes, drink water, and eat something light. If it continues, consult a healthcare provider.`,
    cold: `Common cold symptoms include sneezing, congestion, and mild fever. Rest well, stay hydrated, and consider decongestants or steam inhalation. Avoid contact with others to prevent spreading.`,
    fatigue: `Chronic fatigue may be linked to poor sleep, stress, or underlying health conditions. Ensure a consistent sleep schedule and manage stress. If fatigue persists, medical evaluation is recommended.`,
    anxious: `Feeling anxious can be a response to stress or overwhelming situations. Breathing exercises, physical activity, and limiting caffeine can help. Seek therapy if anxiety interferes with daily life.`,
    'abdominal pain': `Abdominal pain can result from various causes like indigestion, gas, or more serious conditions. Over-the-counter antacids may help. If pain is severe or persistent, consult a healthcare provider.`,
    acne: `Acne is common and can be managed with proper skincare. Over-the-counter topical treatments containing benzoyl peroxide or salicylic acid can be effective. Maintain a regular cleansing routine.`,
    allergies: `Allergies can cause sneezing, itching, and congestion. Antihistamines like loratadine can alleviate symptoms. Avoid known allergens and keep your environment clean.`,
    anemia: `Anemia leads to fatigue and weakness due to low red blood cells. Iron supplements and iron-rich foods like spinach and red meat can help. Consult a doctor for proper diagnosis and treatment.`,
    arthritis: `Arthritis causes joint pain and stiffness. Over-the-counter NSAIDs like ibuprofen can reduce inflammation. Regular exercise and physical therapy may improve joint function.`,
    asthma: `Asthma leads to wheezing and shortness of breath. Inhalers prescribed by a doctor are essential. Avoid triggers like smoke and allergens.`,
    'back pain': `Back pain can result from muscle strain or poor posture. Rest, gentle stretching, and over-the-counter pain relievers can help. Maintain proper posture and ergonomics.`,
    'bleeding gums': `Bleeding gums may indicate gum disease. Regular brushing, flossing, and dental check-ups are important. Using an antiseptic mouthwash can also help.`,
    blisters: `Blisters are caused by friction or burns. Keep the area clean and avoid popping them to prevent infection. Cover with a sterile bandage if necessary.`,
    bloating: `Bloating can result from overeating or gas. Eating slowly, avoiding carbonated drinks, and over-the-counter remedies like simethicone can provide relief.`,
    'blurred vision': `Blurred vision can be due to eye strain or underlying conditions. Rest your eyes and ensure proper lighting. If it persists, consult an eye specialist.`,
    'body aches': `Body aches are common with infections like the flu. Rest, hydration, and over-the-counter pain relievers can alleviate discomfort.`,
    'breast pain': `Breast pain can be related to hormonal changes. Wearing a supportive bra and applying warm compresses may help. Consult a doctor if pain is persistent.`,
    breathlessness: `Shortness of breath can be due to various causes including asthma or anxiety. Practice deep breathing exercises and consult a healthcare provider if it persists.`,
    'bruising easily': `Easy bruising may result from vitamin deficiencies or blood disorders. Ensure adequate intake of vitamin C and K. Consult a doctor for persistent issues.`,
    'burning sensation': `A burning sensation can occur due to nerve issues or infections. Avoid irritants and consult a healthcare provider for proper evaluation.`,
    'chest pain': `Chest pain can be serious. If you experience chest pain, especially with shortness of breath or dizziness, seek immediate medical attention.`,
    chills: `Chills often accompany fever. Keep warm and rest. If chills persist or are severe, consult a healthcare provider.`,
    'cold sores': `Cold sores are caused by the herpes simplex virus. Antiviral creams can reduce duration. Avoid sharing utensils and maintain good hygiene.`,
    constipation: `Constipation can be relieved by increasing fiber intake, staying hydrated, and regular exercise. Over-the-counter laxatives may be used occasionally.`,
    cramps: `Muscle cramps can result from dehydration or overuse. Stretching and staying hydrated can prevent cramps. Apply heat to relieve discomfort.`,
    cyanosis: `Cyanosis, or bluish skin, indicates low oxygen levels. Seek immediate medical attention if you notice this symptom.`,
    cystitis: `Cystitis is bladder inflammation causing painful urination. Drinking plenty of water and cranberry juice may help. Consult a doctor for persistent symptoms.`,
    cysts: `Cysts are fluid-filled sacs under the skin. Most are harmless, but if painful or growing, seek medical advice.`,
    diarrhea: `Diarrhea can result from infections or diet. Stay hydrated and consider oral rehydration solutions. Seek medical attention if it persists.`,
    'dry eyes': `Dry eyes can cause irritation. Use artificial tears and avoid prolonged screen time. Consult an eye specialist if symptoms persist.`,
    earache: `Earaches can result from infections. Applying a warm compress and over-the-counter pain relievers can help. Consult a doctor if pain is severe.`,
    eczema: `Eczema causes itchy, inflamed skin. Moisturize regularly and avoid known irritants. Topical corticosteroids may be prescribed.`,
    'eye redness': `Red eyes can result from irritation or infection. Avoid rubbing and use lubricating eye drops. Seek medical advice if redness persists.`,
    fainting: `Fainting can be due to low blood pressure or dehydration. Sit or lie down immediately and elevate your legs. Consult a doctor for evaluation.`,
    flatulence: `Excessive gas can be managed by avoiding gas-producing foods and eating slowly. Over-the-counter remedies like simethicone may help.`,
    'frequent urination': `Frequent urination can be a sign of urinary tract infections or diabetes. Monitor fluid intake and consult a healthcare provider for evaluation.`,
    gas: `Gas can cause discomfort and bloating. Avoid carbonated drinks and certain foods. Over-the-counter remedies may provide relief.`,
    gastritis: `Gastritis is stomach lining inflammation. Avoid spicy foods and alcohol. Antacids or proton pump inhibitors may be helpful, but consult a doctor for long-term treatment.`,
    gout: `Gout is a form of arthritis caused by uric acid buildup. Drink plenty of water, avoid alcohol, and consume less purine-rich foods like red meat. Medications like allopurinol may be prescribed.`,
    'hair loss': `Hair loss can result from stress, genetics, or nutrient deficiencies. A balanced diet and proper hair care may help. Consult a doctor if hair loss is severe or sudden.`,
    halitosis: `Halitosis, or bad breath, can be caused by poor oral hygiene or digestive issues. Regular brushing, flossing, and staying hydrated can help. Consider a dentist visit if persistent.`,
    'heart palpitations': `Heart palpitations can occur due to stress, anxiety, or heart conditions. Try relaxation techniques, and monitor your heart rate. Consult a doctor if palpitations are frequent or severe.`,
    heartburn: `Heartburn is caused by acid reflux. Avoid spicy foods, caffeine, and alcohol. Over-the-counter antacids like Tums can help. If frequent, see a doctor for further management.`,
    hemorrhoids: `Hemorrhoids are swollen veins in the rectal area. High-fiber foods, increased water intake, and avoiding straining can help. Use topical treatments for relief.`,
    hiccups: `Hiccups are caused by involuntary contractions of the diaphragm. Holding your breath, drinking water, or eating a teaspoon of sugar can help relieve them.`,
    hoarseness: `Hoarseness can be caused by overuse of the voice, infection, or allergies. Rest your voice, stay hydrated, and consider using throat lozenges.`,
    'hot flashes': `Hot flashes are common during menopause. Staying cool, drinking cold fluids, and wearing breathable fabrics can help. Hormone therapy may also be considered after consulting with a doctor.`,
    hyperhidrosis: `Hyperhidrosis is excessive sweating, which may occur due to stress or medical conditions. Antiperspirants, iontophoresis, or prescription medications may help manage the condition.`,
    hypertension: `Hypertension, or high blood pressure, can be managed through a balanced diet, exercise, and medication. Limit salt intake and avoid stress to help lower blood pressure.`,
    hypoglycemia: `Hypoglycemia, or low blood sugar, can cause dizziness and confusion. Eat small, frequent meals with carbohydrates. Drink juice or eat candy if blood sugar is too low.`,
    hypotension: `Hypotension, or low blood pressure, can cause dizziness and fainting. Increase salt intake, stay hydrated, and wear compression stockings. Seek medical advice if symptoms persist.`,
    indigestion: `Indigestion can occur after eating spicy or fatty foods. Antacids or proton pump inhibitors can provide relief. Eating smaller meals more frequently can help avoid indigestion.`,
    insomnia: `Insomnia is the inability to sleep. Maintain a regular sleep schedule, avoid caffeine late in the day, and try relaxation techniques. If it continues, consult a doctor.`,
    itching: `Itching can be caused by allergies, dry skin, or infections. Use moisturizers and avoid scratching. Over-the-counter antihistamines or hydrocortisone creams may be helpful.`,
    'joint pain': `Joint pain can result from arthritis, overuse, or injuries. Apply ice or heat, rest, and take over-the-counter pain relievers like ibuprofen. Physical therapy may help improve joint function.`,
    jaundice: `Jaundice, characterized by yellowing skin and eyes, may indicate liver problems. Seek immediate medical attention for proper diagnosis and treatment.`,
    'knee pain': `Knee pain can result from strain, arthritis, or injuries. Rest, ice, compression, and elevation (RICE) can provide relief. If the pain is severe, consult a healthcare provider.`,
    'leg cramps': `Leg cramps often occur at night and are caused by dehydration or overuse. Stretching, staying hydrated, and consuming magnesium-rich foods can help prevent cramps.`,
    lightheadedness: `Lightheadedness can be caused by low blood pressure or dehydration. Drink water and sit or lie down if you're feeling faint. If persistent, consult a doctor.`,
    'loss of appetite': `Loss of appetite can be caused by illness, stress, or medications. Focus on small, nutritious meals. If it lasts for an extended period, seek medical advice.`,
    'low back pain': `Low back pain is common due to poor posture or muscle strain. Apply heat or cold, and try gentle stretching exercises. Consult a doctor if pain persists.`,
    'low energy': `Low energy can be caused by poor sleep, stress, or underlying health conditions. Ensure you get adequate rest, eat a balanced diet, and exercise regularly.`,
    'memory loss': `Memory loss can result from aging, stress, or more serious conditions like dementia. Practice memory exercises, and consult a healthcare provider for evaluation.`,
    'menstrual cramps': `Menstrual cramps are common and can be relieved with over-the-counter pain relievers like ibuprofen. Apply heat or take warm baths for added relief.`,
    'mouth ulcers': `Mouth ulcers can be caused by stress, injury, or vitamin deficiencies. Use soothing mouth gels or salt water rinses. They usually heal on their own within a week.`,
    'muscle pain': `Muscle pain can result from strain, exercise, or injury. Rest, apply heat or cold, and take over-the-counter pain relievers for relief.`,
    'muscle weakness': `Muscle weakness can be caused by fatigue, nerve issues, or muscle diseases. Ensure proper nutrition, stay active, and consult a healthcare provider if weakness persists.`,
    'nasal congestion': `Nasal congestion can be caused by a cold, allergies, or sinus infection. Use a saline nasal spray, take decongestants, and stay hydrated.`,
    'neck pain': `Neck pain can result from poor posture, stress, or injury. Apply ice or heat, and consider gentle stretches. If pain persists, seek medical advice.`,
    'night sweats': `Night sweats can be caused by stress, menopause, or infections. Ensure your bedroom is cool and comfortable. Consult a doctor if they persist.`,
    nosebleeds: `Nosebleeds can occur due to dry air, allergies, or trauma. Keep your nasal passages moist with saline spray and avoid picking your nose. Seek medical attention for frequent nosebleeds.`,
    numbness: `Numbness can result from nerve compression or poor circulation. Avoid sitting in one position for too long. If numbness persists, consult a healthcare provider.`,
    palpitations: `Heart palpitations can be triggered by stress, caffeine, or heart conditions. Try relaxation techniques or deep breathing. If they become frequent or severe, consult a doctor.`,
    'pelvic pain': `Pelvic pain can result from menstrual issues, gastrointestinal problems, or infections. Over-the-counter pain relievers can help, but see a doctor if the pain is severe.`,
    rash: `Rashes can be caused by allergies, infections, or skin conditions. Use mild soaps and moisturizing lotions. Consult a doctor for a proper diagnosis if the rash persists.`,
    'runny nose': `A runny nose is often caused by a cold or allergies. Drink plenty of fluids and use saline nasal sprays to relieve congestion. Avoid exposure to allergens.`,
    sciatica: `Sciatica is pain caused by irritation of the sciatic nerve. Stretching, physical therapy, and over-the-counter pain relievers can help alleviate symptoms.`,
    'shortness of breath': `Shortness of breath can result from respiratory infections, asthma, or anxiety. Stay calm and try deep breathing exercises. Consult a healthcare provider if it persists.`,
    'sinus pressure': `Sinus pressure can result from a cold, allergies, or sinus infection. Use a saline rinse, take decongestants, and apply a warm compress to relieve discomfort.`,
    'skin dryness': `Dry skin can be caused by weather, dehydration, or skin conditions. Use moisturizing lotions and stay hydrated to prevent dryness.`,
    sleepiness: `Sleepiness can be caused by poor sleep, stress, or underlying conditions.Maintain a regular sleep schedule, limit caffeine, and exercise regularly.`,
    sneezing: `Sneezing is often a response to irritants like dust or allergens. Stay away from known triggers and use antihistamines if necessary.`,
    'stomach ache': `Stomach aches can be caused by indigestion, gas, or infections. Drink warm water, apply heat, and avoid heavy foods. If the pain persists, consult a doctor.`,
    stress: `Stress can cause physical and mental health issues. Practice relaxation techniques, deep breathing exercises, and stay active to manage stress effectively.`,
    swelling: `Swelling can be caused by injury, inflammation, or fluid retention. Rest, elevate the affected area, and apply ice to reduce swelling.`,
    'throat pain': `Throat pain can be caused by infections like the common cold or strep throat. Drink warm liquids, gargle with salt water, and take pain relievers for relief.`,
    toothache: `Toothaches can result from dental issues like cavities or gum disease. Rinse with warm salt water, avoid very hot or cold foods, and consult a dentist for treatment.`,
    'urinary urgency': `Urinary urgency can be a symptom of urinary tract infections or overactive bladder. Drink plenty of water and avoid irritants like caffeine. Consult a doctor for persistent symptoms.`,
    vomiting: `Vomiting can occur due to infections, food poisoning, or motion sickness. Stay hydrated and eat bland foods. If vomiting persists, consult a healthcare provider.`,
    'weight gain': `Weight gain can be due to overeating, lack of exercise, or hormonal changes. Focus on a balanced diet and regular exercise to manage your weight.`,
    'weight loss': `Unexplained weight loss may be due to underlying conditions such as thyroid problems or infections. Maintain a healthy diet, and consult a doctor if the weight loss is significant or persistent.`,
    wheezing: `Wheezing can be a sign of asthma or a respiratory infection. Avoid triggers, use prescribed inhalers, and consult a doctor if the wheezing worsens.`,
    wrinkles: `Wrinkles are a natural part of aging. Moisturize regularly, wear sunscreen, and consider anti-aging products to keep skin healthy.`,
    'yeast infection': `Yeast infections can cause itching and discomfort. Over-the-counter antifungal treatments like creams or suppositories can help. Consult a doctor if symptoms persist or worsen.`,
};

const DISTRESS_KEYWORDS = [
     'unconscious', "can't bear", 'cant bear', 'severe', 'intense', 'worst', 'unbearable', 'emergency', 'help', 'dying', 'critical', 'no'
];

const App: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [waitingForDistressResponse, setWaitingForDistressResponse] = useState<boolean>(false);

    const getBotResponse = (userInput: string): string | null => {
        const input = userInput.toLowerCase();
        for (let keyword of SYMPTOM_KEYWORDS) {
            if (input.includes(keyword)) {
                return SYMPTOM_RESPONSES[keyword];
            }
        }
        return null;
    };

    const checkDistress = (userInput: string): boolean => {
        const input = userInput.toLowerCase();
        return DISTRESS_KEYWORDS.some(keyword => input.includes(keyword));
    };

    const handleSend = (customText?: string) => {
        const textToSend = customText || input.trim();
        if (textToSend === '') return;

        const userMessage = { text: textToSend, isUser: true };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setSuggestions([]);

        if (waitingForDistressResponse) {
            if (checkDistress(textToSend)) {
                const distressMessage = {
                    text: '⚠️ Please go to the Contact tab to find emergency hotlines and call for an ambulance, or visit the Location tab to find the nearest healthcare facility.',
                    isUser: false,
                    isDistress: true,
                };
                setMessages(prevMessages => [...prevMessages, distressMessage]);
            } else {
                const botConsciousResponse = {
                    text: "Thank you for the information. If your condition worsens, please seek immediate medical help.",
                    isUser: false,
                };
                setMessages(prevMessages => [...prevMessages, botConsciousResponse]);
            }
            setWaitingForDistressResponse(false);
        } else {
            const botResponse = getBotResponse(textToSend);
            if (botResponse) {
                const botSymptomResponse = { text: botResponse, isUser: false };
                setMessages(prevMessages => [...prevMessages, botSymptomResponse]);
                const botFollowUpQuestion = {
                    text: "Are you still conscious and able to bear the symptom?",
                    isUser: false,
                };
                setMessages(prevMessages => [...prevMessages, botFollowUpQuestion]);
                setWaitingForDistressResponse(true);
            } else {
                const botUnclearResponse = {
                    text: "I'm not quite sure I understand. Could you describe your symptoms a bit more clearly?",
                    isUser: false,
                };
                setMessages(prevMessages => [...prevMessages, botUnclearResponse]);
            }
        }
    };

    const handleInputChange = (text: string) => {
        setInput(text);
        const filtered = SYMPTOM_KEYWORDS.filter(symptom =>
            symptom.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(text ? filtered.slice(0, 5) : []);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>TeleMed</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.messagesContainer}>
                {messages.length === 0 && (
                    <View style={styles.botWelcomeContainer}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/doctor-male.png' }}
                            style={styles.botImage}
                        />
                        <Text style={styles.botName}>TeleMed Bot</Text>
                        <View style={styles.messageBox}>
                            <Text style={styles.messageText}>
                               Hi, I'm TeleMed, your healthcare chatbot. Please feel free to express how you're feeling so we can better understand your situation and provide helpful information and guidance.

                            </Text>
                        </View>
                    </View>
                )}
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            msg.isUser ? styles.userMessage : styles.botMessage,
                            msg.isDistress && styles.distressMessage, // Apply distress styling
                        ]}
                    >
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>

            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    <Text style={styles.suggestionsTitle}>Did you mean:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {suggestions.map((symptom, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSend(symptom)}
                                style={styles.suggestionButton}
                            >
                                <Text style={styles.suggestionText}>{symptom}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    value={input}
                    onChangeText={handleInputChange}
                    onSubmitEditing={() => handleSend()}
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
                    <Icon name="paper-plane" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="home-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="location-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="chatbubble-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="person-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        backgroundColor: '#7B4B94',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    messagesContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
    botWelcomeContainer: { alignItems: 'center', marginBottom: 20 },
    botImage: { width: 80, height: 80, tintColor: '#7B4B94' },
    botName: { marginTop: 10, fontSize: 20, fontWeight: '600' },
    messageBox: {
        marginTop: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 12,
        maxWidth: '80%',
    },
    messageText: { color: '#555', textAlign: 'center' },
    messageBubble: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        maxWidth: '80%',
    },
    userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
    botMessage: { backgroundColor: '#f2f2f2', alignSelf: 'flex-start' },
    inputContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 60,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButton: {
        backgroundColor: '#7B4B94',
        padding: 10,
        borderRadius: 30,
        marginLeft: 8,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#7B4B94',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
    },
    suggestionsContainer: {
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    suggestionsTitle: { fontWeight: 'bold', marginBottom: 6 },
    suggestionButton: {
        backgroundColor: '#e0d4ec',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 6,
    },
    suggestionText: { color: '#333' },
    distressMessage: {
        backgroundColor: '#FFDDDD', // Light red color for distress message
        borderColor: '#FF0000',     // Red border
        borderWidth: 1,
    },
});

export default App;