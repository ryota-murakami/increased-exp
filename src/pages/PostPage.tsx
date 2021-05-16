import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Post } from '../../DataStructure'
import Layout from '../components/Layout'
import axios from 'axios'

interface RouterParam {
  postId: Post['id']
}

const PostPage: React.FC<RouteComponentProps<RouterParam>> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get<Post>(
          `${process.env.REACT_APP_API_ENDPOINT}/post/${postId}`
        )
        setPost(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
    fetchPosts()
  }, [postId])

  return (
    <Layout>
      {post && (
        <>
          <h1 className="text-4xl mb-2">{post.title}</h1>
          <div>{post.body}</div>
        </>
      )}
    </Layout>
  )
}

export default PostPage
