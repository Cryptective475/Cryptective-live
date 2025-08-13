import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogFeed from "@/components/blog-feed";
import { Calendar, Filter, Rss } from "lucide-react";

export default function Blog() {
  const [selectedSource, setSelectedSource] = useState("all");

  const newsSources = [
    { id: "all", name: "All Sources" },
    { id: "CoinTelegraph", name: "CoinTelegraph" },
    { id: "Decrypt", name: "Decrypt" },
    { id: "CoinDesk", name: "CoinDesk" },
    { id: "Bitcoin Magazine", name: "Bitcoin Magazine" }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Cryptocurrency News & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest cryptocurrency news, market analysis, and industry developments from trusted sources.
          </p>
        </div>

        {/* News Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by source:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {newsSources.map((source) => (
              <Button
                key={source.id}
                variant={selectedSource === source.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSource(source.id)}
                className="transition-all duration-200"
              >
                {source.name}
              </Button>
            ))}
          </div>
        </div>

        {/* News Articles */}
        <BlogFeed />

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-4">
            Load More Articles
          </Button>
        </div>

        {/* News Sources Credits */}
        <div className="mt-16 p-8 rounded-2xl bg-muted/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <Rss className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Trusted News Sources</h3>
            <p className="text-muted-foreground">
              We aggregate news from the most reliable and respected cryptocurrency publications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-background shadow-sm">
              <div className="font-medium text-lg mb-1">CoinTelegraph</div>
              <div className="text-sm text-muted-foreground">Market Analysis & Breaking News</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background shadow-sm">
              <div className="font-medium text-lg mb-1">Decrypt</div>
              <div className="text-sm text-muted-foreground">Tech & Innovation</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background shadow-sm">
              <div className="font-medium text-lg mb-1">CoinDesk</div>
              <div className="text-sm text-muted-foreground">Industry News & Insights</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background shadow-sm">
              <div className="font-medium text-lg mb-1">Bitcoin Magazine</div>
              <div className="text-sm text-muted-foreground">Bitcoin & Blockchain Focus</div>
            </div>
          </div>
        </div>

        {/* RSS Update Info */}
        <div className="mt-8 text-center">
          <Badge variant="secondary" className="inline-flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            News updates every 30 minutes
          </Badge>
        </div>
      </div>
    </div>
  );
}
