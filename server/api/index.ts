import type { Router } from 'express'
import express from 'express'

import {
  getAllPost,
  getPost,
  deletePost,
  createPost,
  updatePost,
} from './routes/post'
import { pushStock, getStockList, deleteStock } from './routes/stock'
import { userCount, signup, login, logout } from './routes/user'

const router: Router = express.Router()

/**
 API Implementation
 */
router.get('/user_count', userCount)

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

router.get('/post_list', getAllPost)

router.get('/post/:id', getPost)

router.delete('/post/:id', deletePost)

router.post('/create', createPost)

router.post('/update', updatePost)

router.post('/push_stock', pushStock)

router.get('/stocklist', getStockList)

router.delete('/stock/:id', deleteStock)

// @TODO add update author info handler

export default router
