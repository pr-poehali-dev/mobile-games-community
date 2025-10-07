import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  trending: boolean;
  timestamp: string;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "TechGamer_2024",
      avatar: "TG",
      content: "Только что попробовал новую RPG 'Cyber Knights'! Графика просто космос 🚀 Оптимизация под мобилки на высоте, даже на средних устройствах идет плавно. Кто еще играет?",
      category: "Игры",
      likes: 247,
      comments: 45,
      trending: true,
      timestamp: "2 часа назад"
    },
    {
      id: 2,
      author: "CodeMaster",
      avatar: "CM",
      content: "Нужна помощь с оптимизацией приложения. Есть лаги при прокрутке списков. Кто сталкивался с подобным? Использую RecyclerView в Android.",
      category: "Помощь",
      likes: 89,
      comments: 23,
      trending: false,
      timestamp: "5 часов назад"
    },
    {
      id: 3,
      author: "MobileDevPro",
      avatar: "MD",
      content: "Обзор топ-5 эмуляторов для старых консолей на Android. Протестировал все на флагманах и бюджетниках. Результаты в комментах 👇",
      category: "Программы",
      likes: 512,
      comments: 78,
      trending: true,
      timestamp: "1 день назад"
    }
  ]);

  const [activeTab, setActiveTab] = useState<'trending' | 'community' | 'help'>('trending');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Игры');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleNewPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      author: "Вы",
      avatar: "ВЫ",
      content: `${newPostTitle}\n\n${newPostContent}`,
      category: newPostCategory,
      likes: 0,
      comments: 0,
      trending: false,
      timestamp: "Только что"
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostTitle('');
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'trending') return post.trending;
    if (activeTab === 'help') return post.category === 'Помощь';
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GAME COMMUNITY
          </h1>
          <p className="text-muted-foreground text-lg">Сообщество мобильных игр и приложений</p>
        </header>

        <nav className="flex gap-4 mb-8 flex-wrap animate-scale-in">
          <Button
            variant={activeTab === 'trending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trending')}
            className="gap-2 rounded-full transition-all hover:scale-105"
          >
            <Icon name="TrendingUp" size={18} />
            Популярное
          </Button>
          <Button
            variant={activeTab === 'community' ? 'default' : 'outline'}
            onClick={() => setActiveTab('community')}
            className="gap-2 rounded-full transition-all hover:scale-105"
          >
            <Icon name="Users" size={18} />
            Сообщество
          </Button>
          <Button
            variant={activeTab === 'help' ? 'default' : 'outline'}
            onClick={() => setActiveTab('help')}
            className="gap-2 rounded-full transition-all hover:scale-105"
          >
            <Icon name="HelpCircle" size={18} />
            Помощь
          </Button>
        </nav>

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full mb-6 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02]"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Создать пост
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Новый пост</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Заголовок поста"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="text-lg"
              />
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-card border border-border text-foreground"
              >
                <option>Игры</option>
                <option>Программы</option>
                <option>Помощь</option>
              </select>
              <Textarea
                placeholder="Расскажите что-то интересное..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-32 text-base"
              />
              <Button 
                onClick={handleNewPost}
                disabled={!newPostContent || !newPostTitle}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                Опубликовать
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-4 mb-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="text-white font-bold">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{post.author}</span>
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.trending && (
                      <Badge className="text-xs bg-gradient-to-r from-secondary to-accent border-0">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>
              </div>

              <p className="text-foreground mb-4 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              <div className="flex gap-6 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="gap-2 hover:text-secondary transition-colors"
                >
                  <Icon name="ThumbsUp" size={18} />
                  <span className="font-semibold">{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-accent transition-colors"
                >
                  <Icon name="MessageCircle" size={18} />
                  <span className="font-semibold">{post.comments}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-primary transition-colors"
                >
                  <Icon name="Share2" size={18} />
                  Поделиться
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
