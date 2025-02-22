"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const download = [
  {
    id: 1,
    title: "Personal Finance",
    description: "Learn how to manage personal finances effectively.",
    pdfUrl:
      "https://drive.google.com/uc?export=download&id=1IGyo7Xdu49DL_zp9fnjnauJqHVP6RnuI",
  },
  {
    id: 2,
    title: "Financial Literacy",
    description: "Understand stock price movements using indicators.",
    pdfUrl:
      "https://drive.google.com/uc?export=download&id=1IGyo7Xdu49DL_zp9fnjnauJqHVP6RnuI",
  },
  {
    id: 3,
    title: "Finance and capital markets",
    description: "Understand stock price movements using indicators.",
    pdfUrl:
      "https://drive.google.com/uc?export=download&id=1IGyo7Xdu49DL_zp9fnjnauJqHVP6RnuI",
  },
];

const modules = [
  {
    id: 1,
    title: "Personal Finance",
    description: "Learn how to manage personal finances effectively.",
    url: "https://www.khanacademy.org/college-careers-more/personal-finance",
  },
  {
    id: 2,
    title: "Financial Literacy",
    description:
      "We look forward to helping you take control of your financial future!",
    url: "https://www.khanacademy.org/college-careers-more/financial-literacy/xa6995ea67a8e9fdd:welcome-to-financial-literacy",
  },
  {
    id: 3,
    title: "Finance and capital markets",
    description: "Understand about Finance and capital markets",
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
  },
];

const videos = [
  {
    id: "video1",
    title: "Basics of Stock Market",
    url: "https://www.youtube.com/embed/Xn7KWR9EOGQ",
  },
  {
    id: "video2",
    title: "Financial Literacy",
    url: "https://www.youtube.com/embed/igz52RqAvbU?si=ufNoADnKyQhpz3uY",
  },
  {

  id: "video3",
  title: "Finance and capital markets",
  url: "https://www.youtube.com/embed/o2qtYPj44VA?si=0zB8FNJs0XGqJkc0"


}

];

export default function LearningPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
      <h1 className="text-3xl font-bold mb-6">📚 Financial Learning Hub</h1>

      {/* Learning Modules */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">📘</span> Learning Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <a
              key={module.id}
              href={module.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer border rounded-xl">
                <CardContent>
                  <h3 className="text-lg font-bold">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Download Modules */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">📥</span> Download Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {download.map((item) => (
            <Card key={item.id} className="p-4 border rounded-xl">
              <CardContent>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <a href={item.pdfUrl} download>
                  <Button className="mt-3 w-full bg-green-600 text-white hover:bg-green-700 transition-all">
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video Resources */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">🎥</span> Video Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="p-4 border rounded-xl">
              <CardContent>
                <h3 className="text-lg font-bold ">{video.title}</h3>
                <div className=" w-full  overflow-hidden rounded-lg border">
                  <iframe
                    className=" w-200"
                    src={video.url}
                    title={video.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
