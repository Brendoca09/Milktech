import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogPost } from '../types/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt' | 'slug'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

// Mock initial posts
const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Revolução na Análise de Leite: Como a Tecnologia Vaca Roxa Está Transformando o Setor',
    content: `A indústria láctea está passando por uma transformação sem precedentes com a chegada de tecnologias inovadoras como o sistema Vaca Roxa. Esta revolução tecnológica promete não apenas melhorar a qualidade do leite, mas também otimizar todo o processo produtivo.

## O Que É o Sistema Vaca Roxa?

O sistema Vaca Roxa representa um avanço significativo na análise de leite, utilizando uma raquete inteligente que realiza análises instantâneas e precisas. Esta tecnologia permite:

- Análise em tempo real da composição do leite
- Detecção de impurezas e contaminantes
- Monitoramento da qualidade nutricional
- Integração automática com sistemas de gestão

## Benefícios Comprovados

Empresas que já implementaram o sistema relatam melhorias significativas:

1. **Aumento de 40% na eficiência** dos processos de controle de qualidade
2. **Redução de 60% no tempo** necessário para análises
3. **Melhoria de 35% na qualidade** final do produto
4. **ROI positivo em apenas 3 meses** de implementação

## O Futuro da Indústria Láctea

Com a crescente demanda por produtos de alta qualidade e a necessidade de processos mais eficientes, tecnologias como o Vaca Roxa não são apenas uma vantagem competitiva, mas uma necessidade para empresas que desejam se manter relevantes no mercado.

A integração de inteligência artificial e análise em tempo real está redefinindo os padrões da indústria, estabelecendo novos benchmarks de qualidade e eficiência.`,
    excerpt: 'Descubra como a tecnologia Vaca Roxa está revolucionando a análise de leite e transformando a indústria láctea com resultados comprovados.',
    author: 'Equipe Vaca Roxa',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'Tecnologia',
    tags: ['inovação', 'análise de leite', 'tecnologia', 'indústria láctea'],
    featuredImage: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'published',
    slug: 'revolucao-analise-leite-tecnologia-vaca-roxa'
  },
  {
    id: '2',
    title: 'Casos de Sucesso: Empresas que Transformaram seus Processos com Vaca Roxa',
    content: `Neste artigo, apresentamos casos reais de empresas que implementaram o sistema Vaca Roxa e obtiveram resultados extraordinários em seus processos produtivos.

## Laticínios Premium - Aumento de 45% na Produtividade

A Laticínios Premium, uma das maiores empresas do setor no Brasil, implementou o sistema Vaca Roxa em suas três unidades produtivas. Os resultados foram impressionantes:

- **Redução de 50% no tempo de análise**
- **Aumento de 45% na produtividade geral**
- **Melhoria de 30% na satisfação do cliente**
- **Economia de R$ 2,3 milhões anuais**

"O Vaca Roxa revolucionou nossa operação. A precisão e velocidade das análises nos permitiram otimizar toda nossa cadeia produtiva", afirma Carlos Silva, Diretor de Qualidade.

## FazendaVerde - Certificação Internacional Conquistada

A FazendaVerde conseguiu obter certificações internacionais de qualidade após implementar o sistema:

- **ISO 22000 conquistada em 6 meses**
- **Aprovação em auditorias internacionais**
- **Expansão para mercados europeus**
- **Aumento de 60% no valor agregado dos produtos**

## MilkCorp - ROI em Tempo Record

A MilkCorp obteve retorno sobre investimento em apenas 3 meses:

- **Payback em 90 dias**
- **Redução de 40% nos custos operacionais**
- **Eliminação de 95% dos retrabalhos**
- **Aumento de 25% na margem de lucro**

## Conclusão

Estes casos demonstram que o investimento em tecnologia Vaca Roxa não é apenas uma modernização, mas uma transformação completa que gera resultados mensuráveis e sustentáveis.`,
    excerpt: 'Conheça casos reais de empresas que transformaram seus processos e obtiveram resultados extraordinários com o sistema Vaca Roxa.',
    author: 'Ana Rodrigues',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    category: 'Casos de Sucesso',
    tags: ['casos de sucesso', 'resultados', 'empresas', 'ROI'],
    featuredImage: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: 'published',
    slug: 'casos-sucesso-empresas-vaca-roxa'
  }
];

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const addPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt' | 'slug'>) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: now,
      updatedAt: now,
      slug: generateSlug(postData.title)
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.status === 'published');
  };

  return (
    <BlogContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      getPost,
      getPublishedPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
};