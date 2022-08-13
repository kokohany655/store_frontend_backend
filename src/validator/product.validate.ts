import { check} from 'express-validator'
import {validate} from './validator'

export const GetProductById = [
    check('id').optional,
    validate
]

export const CreateProduct = [
    check('title').isString().withMessage('title must be a string').notEmpty()
    .isLength({min: 6})
    .withMessage('name must be at least 6 characters long')
    .isLength({max: 25})
    .withMessage('name must be less than 25 characters long'),
    check('description')
    .isString()
    .withMessage('description must be a string')
    .isLength({min: 50})
    .withMessage('description must be at least 50 characters long')
    .isLength({max: 500})
    .withMessage('description must be at most 500 characters long'),
    check('price')
    .isNumeric()
    .withMessage('price must be a string')
    .isLength({min: 1})
    .withMessage('price must be at least 1 characters long')
    .isLength({max: 200000})
    .withMessage('price must be at most 200000 characters long'),
    check('quantity').isNumeric().withMessage('quantity must be a string').notEmpty(),
    validate
]

export const UpdateProduct = [
    check('id').optional,
    check('title')
    .notEmpty()
    .isString()
    .withMessage('name must be a string')
    .isLength({min: 6})
    .withMessage('name must be at least 6 characters long')
    .isLength({max: 25})
    .withMessage('name must be less than 25 characters long'),
    check('description')
    .isString()
    .withMessage('description must be a string')
    .isLength({min: 50})
    .withMessage('description must be at least 50 characters long')
    .isLength({max: 500})
    .withMessage('description must be at most 500 characters long'),
    check('price')
    .isNumeric()
    .withMessage('price must be a string')
    .isLength({min: 1})
    .withMessage('price must be at least 1 characters long')
    .isLength({max: 200000})
    .withMessage('price must be at most 200000 characters long'),
    check('quantity').isNumeric().withMessage('quantity must be a string').notEmpty(),
    validate
]

export const DeleteProduct = [
    check('id').optional(),
    validate
]
