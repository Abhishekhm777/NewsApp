interface News {
  headLines: HeadLines;
}

interface HeadLines {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  source: Source;
  author: null | string;
  title: null | string;
  description: null | string;
  url: null | string;
  urlToImage: null | string;
  publishedAt: Date | null;
  content: null | string;
}

interface Source {
  id: null | string;
  name: null | string;
}
