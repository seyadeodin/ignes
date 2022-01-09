import { GetStaticProps } from 'next';
import Head from 'next/head';
import { client } from '../../services/prismic';
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>
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
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
    lang: 'en-us',
  })

  console.log(JSON.stringify(response, null, 2))
  //to get details of objects on cascade 
  // the two determines the depth

  return {
    props: {

    }
  }
}
