import { useQuery } from "@tanstack/react-query";
import { getBlogArticles } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";

export default function BlogFeed() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: getBlogArticles,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-muted"></div>
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded mb-3"></div>
              <div className="h-16 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles?.map((article, index) => (
        <Card key={index} className="group hover:shadow-xl transition-shadow overflow-hidden">
          {article.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {article.source}
              </span>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(article.pubDate).toLocaleDateString()}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {article.description}
            </p>
            
            <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                Read Full Article
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
