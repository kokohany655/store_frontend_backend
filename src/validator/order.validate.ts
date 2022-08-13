import { check} from 'express-validator'
import {validate} from './validator'

export const GetOrder = [
    check('id').optional(),
    validate
]

export const CreateOrder = [
    check('user_id').notEmpty().withMessage('user_id must be a string'),
    check('status').isString().withMessage('status must be a string'),
    validate
]

export const UpdateOrder = [
    check('id').optional(),
    check('user_id').notEmpty().withMessage('user_id must be a string'),
    check('status').isNumeric().withMessage('status must be a string'),
    validate
]

export const DeleteOrder = [
    check('id').optional(),
    validate
]

export const addProduct = [
    check('order_id').notEmpty().withMessage('order_id must be a string'),
    check('product_id').notEmpty().withMessage('product_id must be a string'),
    check('quantity').notEmpty().withMessage('quantity must be a string'),
    validate
]
