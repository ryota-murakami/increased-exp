import type { RouteComponentProps } from '@reach/router'
import { navigate } from '@reach/router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import Button from '../elements/Button'
import { API } from '../redux/API'
import { useAppDispatch } from '../redux/hooks'
import { snackbarEnque } from '../redux/snackbarSlice'

const Create: React.FC<RouteComponentProps> = () => {
  const dispatch = useAppDispatch()
  const [createPost] = API.endpoints.createPost.useMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ): void {
    e.preventDefault()
    setState(e.target.value)
  }

  async function execCreate() {
    try {
      setIsSubmitting(() => true)

      const post = await createPost({
        title,
        body,
      }).unwrap()

      dispatch(snackbarEnque({ message: 'New Post Created!', color: 'green' }))
      navigate(`/post/${post.id}`)
      // @ts-ignore disabled TS1196: Catch clause variable type annotation must be 'any' or 'unknown' if specified.
    } catch (error: FetchBaseQueryError) {
      dispatch(snackbarEnque({ message: error.message, color: 'red' }))
    } finally {
      setIsSubmitting(() => false)
    }
  }

  return (
    <Layout className="flex flex-col justify-start">
      <input
        type="text"
        className="mt-3"
        value={title}
        onChange={(e) => handleInputChange(e, setTitle)}
        data-cy="post-title-input"
      />
      <textarea
        className="w-full h-60 mt-3"
        value={body}
        onChange={(e) => handleInputChange(e, setBody)}
        data-cy="post-body-input"
      />
      <div className="flex gap-4 justify-end pt-8">
        <Button
          onClick={execCreate}
          variant="primary"
          isLoading={isSubmitting}
          data-cy="submit-btn"
        >
          Submit
        </Button>
      </div>
    </Layout>
  )
}

export default React.memo(Create)
