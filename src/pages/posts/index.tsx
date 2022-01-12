import { GetStaticProps } from 'next';
import Link from 'next/link'
import Head from 'next/head';
import { client } from '../../services/prismic';
import { RichText } from 'prismic-dom'
import styles from './styles.module.scss'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return ( 
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          { posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time> 
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))
          }

        </div>

      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = client;

  const response = await prismic.getAllByType('article', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    fetch: ['article.title', 'article.content'],
    pageSize: 100,
    lang: 'en-us',
  })

  //console.log(JSON.stringify(response, null, 2))
  //console.log(response)
  //to get details of objects on cascade 
  // the two determines the depth


  //FORMAT YOUR DATA RIGHT AFTER CONSUME IT FROM THE EXTERNAL API
  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  })

  console.log(posts)

  return {
    props: {
      posts
    }
  }
}
