
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Church, Book } from "lucide-react";

interface TopicCategoriesProps {
  onTopicSelect: (topic: string) => void;
}

export const TopicCategories = ({ onTopicSelect }: TopicCategoriesProps) => {
  const topics = [
    {
      title: "Jesus' Divinity",
      description: "Biblical evidence for Christ's deity",
      icon: Church,
      questions: [
        "Is Jesus truly God?",
        "Trinity explanations",
        "Jesus' divine claims"
      ]
    },
    {
      title: "Biblical Reliability",
      description: "Manuscript evidence and accuracy",
      icon: Book,
      questions: [
        "Biblical contradictions",
        "Historical accuracy",
        "Manuscript evidence"
      ]
    },
    {
      title: "The Resurrection",
      description: "Historical evidence for Christ's victory",
      icon: BookOpen,
      questions: [
        "Resurrection evidence",
        "Empty tomb facts",
        "Eyewitness accounts"
      ]
    },
    {
      title: "Science & Faith",
      description: "Harmony between Christianity and science",
      icon: BookOpen,
      questions: [
        "Evolution debates",
        "Age of earth",
        "Intelligent design"
      ]
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Common Topics</h3>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <topic.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">{topic.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{topic.description}</p>
                <div className="space-y-1">
                  {topic.questions.map((question, qIndex) => (
                    <Button
                      key={qIndex}
                      variant="ghost"
                      size="sm"
                      className="text-left justify-start h-auto p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => onTopicSelect(question)}
                    >
                      • {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
