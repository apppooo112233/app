import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const sections = [
  {
    id: 'alphabet',
    title: 'تعلم الحروف الإنجليزية',
    description: 'تعلم الحروف الإنجليزية مع النطق الصحيح والكتابة',
    icon: '🔤',
    color: 'from-blue-500 to-cyan-500',
    features: ['نطق صحيح', 'تمارين كتابة', 'ألعاب تفاعلية']
  },
  {
    id: 'vocabulary',
    title: 'الكلمات والجمل',
    description: 'تعلم كلمات وجمل إنجليزية مفيدة مع الصور',
    icon: '📚',
    color: 'from-purple-500 to-pink-500',
    features: ['كلمات مهمة', 'جمل بسيطة', 'تمارين تفاعلية']
  },
  {
    id: 'quran-stories',
    title: 'القصص القرآنية',
    description: 'تعلم القرآن والإنجليزية من خلال القصص',
    icon: '📖',
    color: 'from-green-500 to-emerald-500',
    features: ['قصص هادفة', 'تعلم مزدوج', 'أنشطة تفاعلية']
  },
  {
    id: 'games',
    title: 'الألعاب التعليمية',
    description: 'العب وتعلم مع مجموعة من الألعاب الممتعة',
    icon: '🎮',
    color: 'from-yellow-500 to-orange-500',
    features: ['ألعاب متنوعة', 'مكافآت تشجيعية', 'تحديات ممتعة']
  },
  {
    id: 'interactive-stories',
    title: 'القصص التفاعلية',
    description: 'تعلم من خلال قصص شيقة وتفاعلية',
    icon: '📱',
    color: 'from-red-500 to-rose-500',
    features: ['قصص مصورة', 'تفاعل صوتي', 'تعلم الكلمات']
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Head>
        <title>تعلم اللغة الإنجليزية والقرآن الكريم</title>
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            تعلم اللغة الإنجليزية والقرآن الكريم
          </h1>
          <p className="text-xl text-gray-600">
            طريقة ممتعة وتفاعلية لتعلم اللغة الإنجليزية مع حفظ القرآن الكريم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link href={`/${section.id}`} key={section.id}>
              <div className={`
                relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-2
                bg-gradient-to-br ${section.color} text-white
              `}>
                <div className="absolute top-4 right-4 text-4xl">
                  {section.icon}
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p className="mb-6 opacity-90">{section.description}</p>
                  
                  <ul className="space-y-2">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="mt-6 px-6 py-2 bg-white bg-opacity-20 rounded-full
                                   hover:bg-opacity-30 transition-all">
                    ابدأ التعلم
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ابدأ رحلة التعلم الآن!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            برنامجنا يجمع بين تعلم اللغة الإنجليزية وحفظ القرآن الكريم بطريقة ممتعة وتفاعلية.
            مع تمارين وألعاب وقصص تناسب جميع المستويات.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
