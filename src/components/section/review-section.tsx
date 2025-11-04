import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marc Dubois",
    role: "Beginner in calisthenics",
    image: "/testimonial-1.jpg",
    rating: 5,
    text: "This app completely transformed my training routine. In 3 months I saw incredible results!",
  },
  {
    name: "Sophie Martin",
    role: "Intermediate athlete",
    image: "/testimonial-2.jpg",
    rating: 4,
    text: "The progress tracking is great. I can see exactly how my body evolves week after week.",
  },
  {
    name: "Thomas Leroy",
    role: "Fitness coach",
    image: "/testimonial-3.jpg",
    rating: 5,
    text: "I recommend this app to all my clients. The interface is intuitive and the exercises are well explained.",
  },
];

export default function ReviewSection() {
  return (
    <section className="py-16 px-6 md:py-24 md:px-10 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
            What our users say
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Join thousands of athletes transforming their bodies and track their
            progress with our app
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => {
            const initial =
              review.name?.split(" ")[0]?.[0]?.toUpperCase?.() ?? "";
            return (
              <Card key={index} className="p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-primary">
                    <span aria-hidden="true">{initial}</span>
                    <span className="sr-only">{review.name}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
