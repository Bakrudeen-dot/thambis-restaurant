/**
 * Static menu & dish content.
 *
 * ⚠️  SAMPLE DATA — dishes are typical Tamil / South Indian items used for
 *     layout. Replace with the restaurant's confirmed menu.
 *     `price` is intentionally null; the UI shows "SAR XX" /
 *     "Price available at restaurant" until a number is set.
 *
 * Shape is API-ready: swap these arrays for a fetch() later without
 * touching the components.
 */
import type { L10n } from "./translations";

export const img = (file: string) => `/images/${file}`;

export type CategoryId =
  | "breakfast" | "dosa" | "idli-vada" | "meals" | "biryani" | "vegetarian" | "chicken"
  | "mutton" | "fish" | "parotta" | "kothu" | "snacks" | "drinks" | "desserts";

export interface MenuCategory { id: CategoryId; name: L10n }
export interface MenuItem {
  id: string;
  category: CategoryId;
  name: L10n;
  description: L10n;
  image: string;
  /** SAR. null = not yet provided by the restaurant. */
  price: number | null;
  veg?: boolean;
  spicy?: boolean;
}

export const categories: MenuCategory[] = [
  { id: "breakfast", name: { en: "Breakfast", ta: "காலை உணவு", ar: "الإفطار" } },
  { id: "dosa", name: { en: "Dosa", ta: "தோசை", ar: "دوسا" } },
  { id: "idli-vada", name: { en: "Idli & Vada", ta: "இட்லி & வடை", ar: "إدلي و وادا" } },
  { id: "meals", name: { en: "Meals", ta: "சாப்பாடு", ar: "الوجبات" } },
  { id: "biryani", name: { en: "Biryani", ta: "பிரியாணி", ar: "برياني" } },
  { id: "vegetarian", name: { en: "Vegetarian", ta: "சைவம்", ar: "نباتي" } },
  { id: "chicken", name: { en: "Chicken", ta: "சிக்கன்", ar: "دجاج" } },
  { id: "mutton", name: { en: "Mutton", ta: "மட்டன்", ar: "لحم ضأن" } },
  { id: "fish", name: { en: "Fish", ta: "மீன்", ar: "سمك" } },
  { id: "parotta", name: { en: "Parotta", ta: "பரோட்டா", ar: "باروتا" } },
  { id: "kothu", name: { en: "Kothu", ta: "கொத்து", ar: "كوثو" } },
  { id: "snacks", name: { en: "Snacks", ta: "சிற்றுண்டி", ar: "وجبات خفيفة" } },
  { id: "drinks", name: { en: "Drinks", ta: "பானங்கள்", ar: "المشروبات" } },
  { id: "desserts", name: { en: "Desserts", ta: "இனிப்புகள்", ar: "الحلويات" } },
];

const m = (
  id: string, category: CategoryId, image: string, name: L10n, description: L10n,
  extra: Partial<Pick<MenuItem, "veg" | "spicy">> = {},
): MenuItem => ({ id, category, image: img(image), name, description, price: null, ...extra });

export const menuItems: MenuItem[] = [
  // Breakfast
  m("pongal", "breakfast", "pongal.jpg",
    { en: "Ven Pongal", ta: "வெண் பொங்கல்", ar: "بونغال" },
    { en: "Rice and lentils cooked soft with ghee, pepper and cumin.", ta: "நெய், மிளகு, சீரகத்துடன் சமைத்த அரிசி-பருப்பு.", ar: "أرز وعدس مطهوّان بالسمن والفلفل والكمون." }, { veg: true }),
  m("poori", "breakfast", "poori.jpg",
    { en: "Poori Masala", ta: "பூரி மசாலா", ar: "بوري ماسالا" },
    { en: "Puffed golden poori with a mild potato masala.", ta: "உப்பிய பூரியுடன் உருளைக்கிழங்கு மசாலா.", ar: "خبز بوري منفوخ مع ماسالا البطاطس." }, { veg: true }),
  m("chapati", "breakfast", "chapati.jpg",
    { en: "Chapati & Kurma", ta: "சப்பாத்தி & குருமா", ar: "شباتي مع كورما" },
    { en: "Soft wheat chapati served with vegetable kurma.", ta: "மென்மையான சப்பாத்தி, காய்கறி குருமாவுடன்.", ar: "خبز شباتي طري يُقدَّم مع كورما الخضار." }, { veg: true }),
  // Dosa
  m("masala-dosa", "dosa", "masala-dosa.jpg",
    { en: "Masala Dosa", ta: "மசாலா தோசை", ar: "ماسالا دوسا" },
    { en: "Crisp fermented crêpe filled with spiced potato, with sambar and chutneys.", ta: "உருளைக்கிழங்கு மசாலா நிரப்பிய மொறுமொறு தோசை, சாம்பார் & சட்னியுடன்.", ar: "دوسا مقرمشة محشوة بالبطاطس المتبّلة مع السامبار والصلصات." }, { veg: true }),
  m("ghee-roast", "dosa", "ghee-roast-dosa.jpg",
    { en: "Ghee Roast Dosa", ta: "நெய் ரோஸ்ட்", ar: "دوسا بالسمن" },
    { en: "Paper-thin dosa roasted golden with pure ghee.", ta: "நெய்யில் பொன்னிறமாக வறுத்த மெல்லிய தோசை.", ar: "دوسا رقيقة محمّصة بالسمن حتى تصبح ذهبية." }, { veg: true }),
  m("plain-dosa", "dosa", "plain-dosa.jpg",
    { en: "Plain Dosa", ta: "சாதா தோசை", ar: "دوسا سادة" },
    { en: "The classic — crisp, light and served hot off the tawa.", ta: "பாரம்பரிய தோசை — சூடாக, மொறுமொறுப்பாக.", ar: "الكلاسيكية — مقرمشة وخفيفة وتُقدَّم ساخنة." }, { veg: true }),
  m("uthappam", "dosa", "onion-uthappam.jpg",
    { en: "Onion Uthappam", ta: "வெங்காய ஊத்தப்பம்", ar: "أوتابام بالبصل" },
    { en: "Thick, soft dosa topped with onion, chilli and coriander.", ta: "வெங்காயம், மிளகாய், கொத்தமல்லி தூவிய தடிமனான தோசை.", ar: "دوسا سميكة طرية مغطاة بالبصل والفلفل والكزبرة." }, { veg: true }),
  // Idli & Vada
  m("idli", "idli-vada", "idli.jpg",
    { en: "Idli", ta: "இட்லி", ar: "إدلي" },
    { en: "Steamed rice cakes, soft and fluffy, with sambar and chutney.", ta: "மென்மையான ஆவியில் வேகவைத்த இட்லி, சாம்பார் & சட்னியுடன்.", ar: "كعكات أرز مطهوة على البخار، طرية وخفيفة، مع السامبار." }, { veg: true }),
  m("medu-vada", "idli-vada", "medu-vada.jpg",
    { en: "Medu Vada", ta: "மெது வடை", ar: "ميدو وادا" },
    { en: "Crisp lentil doughnuts, soft inside.", ta: "வெளியே மொறுமொறு, உள்ளே மென்மையான உளுந்து வடை.", ar: "كعك العدس المقلي، مقرمش من الخارج وطري من الداخل." }, { veg: true }),
  m("idli-vada", "idli-vada", "idli-vada.jpg",
    { en: "Idli Vada Combo", ta: "இட்லி வடை", ar: "إدلي مع وادا" },
    { en: "The breakfast pairing Tamil Nadu grew up on.", ta: "தமிழ்நாட்டின் விருப்பமான காலை உணவு ஜோடி.", ar: "ثنائي الإفطار المحبوب في تاميل نادو." }, { veg: true }),
  // Meals
  m("sim", "meals", "south-indian-meals.jpg",
    { en: "South Indian Meals", ta: "தென்னிந்திய சாப்பாடு", ar: "وجبة جنوب هندية" },
    { en: "Rice with sambar, rasam, poriyal, curry, pickle and papad.", ta: "சாதம், சாம்பார், ரசம், பொரியல், குழம்பு, ஊறுகாய், அப்பளம்.", ar: "أرز مع سامبار وراسام وبوريال وكاري ومخلل وبابد." }, { veg: true }),
  m("veg-meals", "meals", "veg-meals.jpg",
    { en: "Banana Leaf Veg Meals", ta: "வாழை இலை சைவ சாப்பாடு", ar: "وجبة نباتية على ورقة الموز" },
    { en: "A full vegetarian spread served the traditional way.", ta: "பாரம்பரிய முறையில் பரிமாறப்படும் முழு சைவ சாப்பாடு.", ar: "وجبة نباتية كاملة تُقدَّم بالطريقة التقليدية." }, { veg: true }),
  // Biryani
  m("chicken-biryani", "biryani", "chicken-biryani.jpg",
    { en: "Chicken Biryani", ta: "சிக்கன் பிரியாணி", ar: "برياني دجاج" },
    { en: "Fragrant rice layered with spiced chicken, with raita.", ta: "மசாலா சிக்கனுடன் மணமான பிரியாணி, ரைத்தாவுடன்.", ar: "أرز عطري بطبقات الدجاج المتبّل مع الرايتا." }, { spicy: true }),
  m("mutton-biryani", "biryani", "mutton-biryani.jpg",
    { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", ar: "برياني لحم" },
    { en: "Tender mutton slow-cooked into aromatic rice.", ta: "மென்மையான மட்டனுடன் மெதுவாகச் சமைத்த பிரியாணி.", ar: "لحم ضأن طري مطهو ببطء مع الأرز العطري." }, { spicy: true }),
  m("egg-biryani", "biryani", "egg-biryani.jpg",
    { en: "Egg Biryani", ta: "முட்டை பிரியாணி", ar: "برياني بيض" },
    { en: "Biryani rice with masala-coated boiled eggs.", ta: "மசாலா முட்டையுடன் பிரியாணி.", ar: "أرز برياني مع بيض مسلوق بالماسالا." }),
  m("veg-biryani", "biryani", "veg-biryani.jpg",
    { en: "Veg Biryani", ta: "காய்கறி பிரியாணி", ar: "برياني خضار" },
    { en: "Seasonal vegetables and whole spices in fragrant rice.", ta: "காய்கறிகள், முழு மசாலாவுடன் மணமான சாதம்.", ar: "خضار وتوابل كاملة مع الأرز العطري." }, { veg: true }),
  // Vegetarian
  m("veg-kurma", "vegetarian", "veg-kurma.jpg",
    { en: "Vegetable Kurma", ta: "காய்கறி குருமா", ar: "كورما الخضار" },
    { en: "Mixed vegetables in a mild coconut gravy.", ta: "தேங்காய் குழம்பில் கலவை காய்கறிகள்.", ar: "خضار مشكلة بصلصة جوز الهند الخفيفة." }, { veg: true }),
  m("paneer", "vegetarian", "paneer-masala.jpg",
    { en: "Paneer Butter Masala", ta: "பனீர் பட்டர் மசாலா", ar: "بانير بالزبدة" },
    { en: "Paneer in a rich, buttery tomato gravy.", ta: "வெண்ணெய் தக்காளி குழம்பில் பனீர்.", ar: "جبن البانير بصلصة الطماطم والزبدة." }, { veg: true }),
  m("sambar", "vegetarian", "sambar.jpg",
    { en: "Sambar", ta: "சாம்பார்", ar: "سامبار" },
    { en: "Lentil and vegetable stew with tamarind and sambar powder.", ta: "புளி, சாம்பார் பொடியுடன் பருப்பு-காய்கறி குழம்பு.", ar: "يخنة العدس والخضار بالتمر الهندي." }, { veg: true }),
  // Chicken
  m("chicken-65", "chicken", "chicken-65.jpg",
    { en: "Chicken 65", ta: "சிக்கன் 65", ar: "دجاج 65" },
    { en: "Crisp, fiery fried chicken with curry leaves.", ta: "கறிவேப்பிலையுடன் காரமான பொரித்த சிக்கன்.", ar: "دجاج مقلي حار ومقرمش بأوراق الكاري." }, { spicy: true }),
  m("chicken-curry", "chicken", "chicken-curry.jpg",
    { en: "Chicken Curry", ta: "சிக்கன் குழம்பு", ar: "كاري دجاج" },
    { en: "Home-style Tamil chicken curry.", ta: "வீட்டுச் சுவை சிக்கன் குழம்பு.", ar: "كاري دجاج على الطريقة التاميلية المنزلية." }, { spicy: true }),
  m("pepper-chicken", "chicken", "pepper-chicken.jpg",
    { en: "Pepper Chicken", ta: "மிளகு சிக்கன்", ar: "دجاج بالفلفل الأسود" },
    { en: "Dry chicken roast with cracked black pepper.", ta: "கருமிளகுடன் வறுத்த சிக்கன்.", ar: "دجاج محمّر بالفلفل الأسود المجروش." }, { spicy: true }),
  // Mutton
  m("mutton-curry", "mutton", "mutton-curry.jpg",
    { en: "Mutton Curry", ta: "மட்டன் குழம்பு", ar: "كاري لحم" },
    { en: "Slow-cooked mutton in a deep, spiced gravy.", ta: "மசாலா குழம்பில் மெதுவாகச் சமைத்த மட்டன்.", ar: "لحم ضأن مطهو ببطء في صلصة غنية بالتوابل." }, { spicy: true }),
  m("mutton-sukka", "mutton", "mutton-sukka.jpg",
    { en: "Mutton Sukka", ta: "மட்டன் சுக்கா", ar: "لحم سوكّا" },
    { en: "Dry-roasted mutton with onion, pepper and spices.", ta: "வெங்காயம், மிளகுடன் வறுத்த மட்டன்.", ar: "لحم محمّر بالبصل والفلفل والتوابل." }, { spicy: true }),
  // Fish
  m("fish-fry", "fish", "fish-fry.jpg",
    { en: "Fish Fry", ta: "மீன் வறுவல்", ar: "سمك مقلي" },
    { en: "Masala-marinated fish, pan-fried until crisp.", ta: "மசாலா தடவி மொறுமொறுப்பாக வறுத்த மீன்.", ar: "سمك متبّل بالماسالا ومقلي حتى يصبح مقرمشًا." }, { spicy: true }),
  m("fish-curry", "fish", "fish-curry.jpg",
    { en: "Fish Curry", ta: "மீன் குழம்பு", ar: "كاري سمك" },
    { en: "Tangy tamarind fish curry, Tamil style.", ta: "புளிப்பான தமிழ் பாணி மீன் குழம்பு.", ar: "كاري سمك بالتمر الهندي على الطريقة التاميلية." }, { spicy: true }),
  // Parotta
  m("parotta", "parotta", "parotta.jpg",
    { en: "Parotta & Salna", ta: "பரோட்டா & சால்னா", ar: "باروتا مع سالنا" },
    { en: "Flaky layered parotta with spiced salna.", ta: "அடுக்கு பரோட்டா, சால்னாவுடன்.", ar: "خبز باروتا متعدد الطبقات مع صلصة السالنا." }),
  m("chilli-parotta", "parotta", "chilli-parotta.jpg",
    { en: "Chilli Parotta", ta: "சில்லி பரோட்டா", ar: "باروتا بالفلفل" },
    { en: "Parotta pieces tossed with chilli, onion and peppers.", ta: "மிளகாய், வெங்காயத்துடன் கிளறிய பரோட்டா.", ar: "قطع باروتا مقلّبة مع الفلفل والبصل." }, { spicy: true }),
  // Kothu
  m("kothu-parotta", "kothu", "kothu-parotta.jpg",
    { en: "Egg Kothu Parotta", ta: "முட்டை கொத்து பரோட்டா", ar: "كوثو باروتا بالبيض" },
    { en: "Shredded parotta chopped on the tawa with egg and salna.", ta: "முட்டை, சால்னாவுடன் தோசைக்கல்லில் கொத்திய பரோட்டா.", ar: "باروتا مقطّعة على الصاج مع البيض والسالنا." }, { spicy: true }),
  m("chicken-kothu", "kothu", "chicken-kothu.jpg",
    { en: "Chicken Kothu Parotta", ta: "சிக்கன் கொத்து பரோட்டா", ar: "كوثو باروتا بالدجاج" },
    { en: "The street-food favourite, loaded with chicken.", ta: "சிக்கன் நிறைந்த தெருவோர விருப்ப உணவு.", ar: "طبق الشارع المحبوب مع الدجاج." }, { spicy: true }),
  // Snacks
  m("bajji", "snacks", "onion-bajji.jpg",
    { en: "Onion Bajji", ta: "வெங்காய பஜ்ஜி", ar: "باجي البصل" },
    { en: "Crisp gram-flour fritters — perfect with tea.", ta: "டீயுடன் சுவைக்க மொறுமொறு பஜ்ஜி.", ar: "فطائر مقلية مقرمشة — مثالية مع الشاي." }, { veg: true }),
  m("tamil-snacks", "snacks", "tamil-snacks.jpg",
    { en: "Tamil Snacks Platter", ta: "தமிழ் சிற்றுண்டி தட்டு", ar: "طبق المقبلات التاميلية" },
    { en: "An assortment of traditional evening snacks.", ta: "பாரம்பரிய மாலை சிற்றுண்டிகள்.", ar: "تشكيلة من الوجبات الخفيفة التقليدية." }, { veg: true }),
  // Drinks
  m("filter-coffee", "drinks", "filter-coffee.jpg",
    { en: "Filter Coffee", ta: "ஃபில்டர் காபி", ar: "قهوة الفلتر" },
    { en: "South Indian decoction coffee with frothy milk.", ta: "நுரை பொங்கும் தென்னிந்திய ஃபில்டர் காபி.", ar: "قهوة جنوب هندية مع حليب رغوي." }, { veg: true }),
  m("masala-tea", "drinks", "masala-tea.jpg",
    { en: "Masala Tea", ta: "மசாலா டீ", ar: "شاي ماسالا" },
    { en: "Milk tea brewed with ginger and cardamom.", ta: "இஞ்சி, ஏலக்காயுடன் பால் டீ.", ar: "شاي بالحليب مع الزنجبيل والهيل." }, { veg: true }),
  m("fresh-juice", "drinks", "fresh-juice.jpg",
    { en: "Fresh Juice", ta: "பழச்சாறு", ar: "عصير طازج" },
    { en: "Seasonal fresh juices.", ta: "பருவகால பழச்சாறுகள்.", ar: "عصائر موسمية طازجة." }, { veg: true }),
  m("rose-milk", "drinks", "rose-milk.jpg",
    { en: "Rose Milk", ta: "ரோஸ் மில்க்", ar: "حليب الورد" },
    { en: "Chilled rose-scented milk.", ta: "குளிர்ந்த ரோஜா மணப் பால்.", ar: "حليب بارد بنكهة الورد." }, { veg: true }),
  // Desserts
  m("payasam", "desserts", "payasam.jpg",
    { en: "Payasam", ta: "பாயசம்", ar: "باياسام" },
    { en: "Sweet milk pudding with cardamom and cashews.", ta: "ஏலக்காய், முந்திரியுடன் இனிப்பு பாயசம்.", ar: "حلوى الحليب بالهيل والكاجو." }, { veg: true }),
  m("kesari", "desserts", "kesari.jpg",
    { en: "Rava Kesari", ta: "ரவா கேசரி", ar: "كيساري السميد" },
    { en: "Semolina sweet with ghee and saffron hues.", ta: "நெய் மணக்கும் ரவா கேசரி.", ar: "حلوى السميد بالسمن ولون الزعفران." }, { veg: true }),
];

/* ─────────────── Curated homepage content ─────────────── */

export interface Feature { id: string; name: L10n; tagline: L10n; image: string }

export const signatureDishes: Feature[] = [
  { id: "masala-dosa", image: img("masala-dosa.jpg"), name: { en: "Masala Dosa", ta: "மசாலா தோசை", ar: "ماسالا دوسا" }, tagline: { en: "Golden, crisp, filled with spiced potato — the icon of the South.", ta: "பொன்னிற மொறுமொறுப்பு, மசாலா நிரப்பிய தென்னகத்தின் அடையாளம்.", ar: "ذهبية ومقرمشة ومحشوة بالبطاطس — أيقونة الجنوب." } },
  { id: "ghee-roast", image: img("ghee-roast-dosa.jpg"), name: { en: "Ghee Roast", ta: "நெய் ரோஸ்ட்", ar: "روست بالسمن" }, tagline: { en: "Paper-thin and roasted in ghee.", ta: "நெய்யில் வறுத்த மெல்லிய தோசை.", ar: "رقيقة ومحمّصة بالسمن." } },
  { id: "meals", image: img("south-indian-meals.jpg"), name: { en: "South Indian Meals", ta: "தென்னிந்திய சாப்பாடு", ar: "وجبة جنوب هندية" }, tagline: { en: "A full spread on a banana leaf.", ta: "வாழை இலையில் முழு சாப்பாடு.", ar: "وليمة كاملة على ورقة الموز." } },
  { id: "chicken-biryani", image: img("chicken-biryani.jpg"), name: { en: "Chicken Biryani", ta: "சிக்கன் பிரியாணி", ar: "برياني دجاج" }, tagline: { en: "Fragrant rice, tender chicken, whole spices.", ta: "மணமான சாதம், மென்மையான சிக்கன்.", ar: "أرز عطري ودجاج طري وتوابل كاملة." } },
  { id: "kothu", image: img("kothu-parotta.jpg"), name: { en: "Kothu Parotta", ta: "கொத்து பரோட்டா", ar: "كوثو باروتا" }, tagline: { en: "The rhythm of the tawa, on a plate.", ta: "தோசைக்கல்லின் தாளம், தட்டில்.", ar: "إيقاع الصاج في طبق واحد." } },
  { id: "chicken-65", image: img("chicken-65.jpg"), name: { en: "Chicken 65", ta: "சிக்கன் 65", ar: "دجاج 65" }, tagline: { en: "Fiery, crisp, unforgettable.", ta: "காரம், மொறுமொறுப்பு, மறக்க முடியாதது.", ar: "حار ومقرمش ولا يُنسى." } },
  { id: "idli-vada", image: img("idli-vada.jpg"), name: { en: "Idli & Vada", ta: "இட்லி & வடை", ar: "إدلي و وادا" }, tagline: { en: "Soft, crisp, and made for sambar.", ta: "மென்மையும் மொறுமொறுப்பும், சாம்பாருக்காக.", ar: "طرية ومقرمشة، وُجدت للسامبار." } },
  { id: "filter-coffee", image: img("filter-coffee-wide.jpg"), name: { en: "Filter Coffee", ta: "ஃபில்டர் காபி", ar: "قهوة الفلتر" }, tagline: { en: "Poured high, served frothy — the perfect finish.", ta: "உயரத்திலிருந்து ஆற்றிய நுரை காபி — சிறந்த நிறைவு.", ar: "تُسكب من علوّ وتُقدَّم برغوة — الختام المثالي." } },
];

export const nonVegDishes: Feature[] = [
  { id: "chicken", image: img("chicken-curry.jpg"), name: { en: "Chicken", ta: "சிக்கன்", ar: "دجاج" }, tagline: { en: "Curries, roasts & pepper fry", ta: "குழம்பு, வறுவல், மிளகு ஃப்ரை", ar: "كاري ومحمّر وبالفلفل" } },
  { id: "mutton", image: img("mutton-curry.jpg"), name: { en: "Mutton", ta: "மட்டன்", ar: "لحم ضأن" }, tagline: { en: "Slow-cooked & sukka", ta: "குழம்பு & சுக்கா", ar: "مطهو ببطء وسوكّا" } },
  { id: "fish", image: img("fish-fry.jpg"), name: { en: "Fish", ta: "மீன்", ar: "سمك" }, tagline: { en: "Fry & tamarind curry", ta: "வறுவல் & புளிக் குழம்பு", ar: "مقلي وبالتمر الهندي" } },
  { id: "biryani", image: img("mutton-biryani.jpg"), name: { en: "Biryani", ta: "பிரியாணி", ar: "برياني" }, tagline: { en: "Chicken, mutton & egg", ta: "சிக்கன், மட்டன், முட்டை", ar: "دجاج ولحم وبيض" } },
  { id: "chicken-65", image: img("chicken-65.jpg"), name: { en: "Chicken 65", ta: "சிக்கன் 65", ar: "دجاج 65" }, tagline: { en: "Crisp & fiery", ta: "மொறுமொறு & காரம்", ar: "مقرمش وحار" } },
  { id: "kothu", image: img("chicken-kothu.jpg"), name: { en: "Kothu", ta: "கொத்து", ar: "كوثو" }, tagline: { en: "Egg & chicken kothu", ta: "முட்டை & சிக்கன் கொத்து", ar: "كوثو بالبيض والدجاج" } },
];

export const cafeItems: Feature[] = [
  { id: "filter-coffee", image: img("filter-coffee.jpg"), name: { en: "South Indian Filter Coffee", ta: "தென்னிந்திய ஃபில்டர் காபி", ar: "قهوة الفلتر الجنوب هندية" }, tagline: { en: "Strong decoction, frothy milk.", ta: "திடமான டிகாக்ஷன், நுரைப் பால்.", ar: "قهوة مركّزة وحليب رغوي." } },
  { id: "tea", image: img("masala-tea.jpg"), name: { en: "Tea", ta: "டீ", ar: "الشاي" }, tagline: { en: "Masala, ginger & classic milk tea.", ta: "மசாலா, இஞ்சி, பால் டீ.", ar: "ماسالا وزنجبيل وشاي بالحليب." } },
  { id: "drinks", image: img("fresh-juice.jpg"), name: { en: "Fresh Drinks", ta: "புத்துணர்ச்சி பானங்கள்", ar: "مشروبات منعشة" }, tagline: { en: "Juices & chilled favourites.", ta: "பழச்சாறுகள் & குளிர் பானங்கள்.", ar: "عصائر ومشروبات باردة." } },
  { id: "desserts", image: img("south-indian-desserts.jpg"), name: { en: "Desserts", ta: "இனிப்புகள்", ar: "الحلويات" }, tagline: { en: "Payasam, kesari & more.", ta: "பாயசம், கேசரி மற்றும் பல.", ar: "باياسام وكيساري والمزيد." } },
];

export interface GalleryImage { src: string; caption: L10n; w: number; h: number }

export const galleryImages: GalleryImage[] = [
  { src: img("masala-dosa.jpg"), w: 1600, h: 1200, caption: { en: "Masala dosa on banana leaf", ta: "வாழை இலையில் மசாலா தோசை", ar: "ماسالا دوسا على ورقة الموز" } },
  { src: img("chicken-biryani.jpg"), w: 1200, h: 1500, caption: { en: "Chicken biryani", ta: "சிக்கன் பிரியாணி", ar: "برياني دجاج" } },
  { src: img("restaurant-interior.jpg"), w: 1600, h: 1200, caption: { en: "Restaurant interior", ta: "உணவக உட்புறம்", ar: "داخل المطعم" } },
  { src: img("banana-leaf-meals.jpg"), w: 2400, h: 1350, caption: { en: "South Indian meals on banana leaf", ta: "வாழை இலை சாப்பாடு", ar: "وجبة جنوب هندية على ورقة الموز" } },
  { src: img("filter-coffee.jpg"), w: 1200, h: 1500, caption: { en: "Filter coffee in tumbler and dabarah", ta: "டம்ளர் டவராவில் ஃபில்டர் காபி", ar: "قهوة الفلتر في الكوب والدبرة" } },
  { src: img("chicken-65.jpg"), w: 1200, h: 1500, caption: { en: "Chicken 65", ta: "சிக்கன் 65", ar: "دجاج 65" } },
  { src: img("idli-vada.jpg"), w: 1600, h: 1200, caption: { en: "Idli and vada with sambar", ta: "சாம்பாருடன் இட்லி வடை", ar: "إدلي و وادا مع السامبار" } },
  { src: img("dining-atmosphere.jpg"), w: 1200, h: 1500, caption: { en: "Dining atmosphere", ta: "உணவருந்தும் சூழல்", ar: "أجواء تناول الطعام" } },
  { src: img("kothu-parotta.jpg"), w: 1600, h: 1200, caption: { en: "Kothu parotta", ta: "கொத்து பரோட்டா", ar: "كوثو باروتا" } },
  { src: img("tamil-spices.jpg"), w: 1200, h: 1500, caption: { en: "Tamil spices", ta: "தமிழ் மசாலாக்கள்", ar: "التوابل التاميلية" } },
  { src: img("fish-fry.jpg"), w: 1600, h: 1200, caption: { en: "Fish fry", ta: "மீன் வறுவல்", ar: "سمك مقلي" } },
  { src: img("cafe-counter.jpg"), w: 1400, h: 1400, caption: { en: "The cafe", ta: "கஃபே", ar: "المقهى" } },
];
