import { GetStaticProps } from "next"
import { useSession } from "next-auth/client"
import Head from "next/head"
import Link from 'next/link'
import router from "next/router"
import { RichText } from "prismic-dom"
import { useEffect } from "react"
import { client } from "../../../services/prismic"

import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }:PostPreviewProps){
  const [ session ] = useSession()

  useEffect(() => {
    if (session?.activeSubscription) router.push(`/posts/${post.slug}`)
  }, [session])

  return(
    <>
       <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <time>{post.updatedAt}</time>
          <h1>{post.title}</h1>
          <div 
            className={`${styles.postContent} ${styles.previewContent}` }
            dangerouslySetInnerHTML={{__html: post.content}} 
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}


export const getStaticPaths = () => {
  return({
    paths: [],
    fallback: 'blocking'
  })
}

//every page that can be public can be static
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = client;

  const response = await prismic.getByUID('article', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 6)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    props: {
      post
    }
  }
}