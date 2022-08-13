import { check} from 'express-validator'
import {validate} from './validator'

export const GetUser = [
    check('id').optional(),
    validate
]

export const CreateUser = [
    check('first_name').isString().withMessage('name must be a string').notEmpty(),
    check('last_name').isString().withMessage('name must be a string').notEmpty(),
    check('email')
    .isEmail().
    withMessage('email must be a string'),
    check('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({min: 6})
    .withMessage('password must be at least 6 characters long'),
    validate
]

export const UpdateUser = [
    check('id').optional(),
    check('first_name')
    .isString()
    .withMessage('name must be a string')
    .isLength({min: 6})
    .withMessage('name must be at least 6 characters long'),
    check('last_name')
    .isString()
    .withMessage('name must be a string')
    .isLength({min: 6})
    .withMessage('name must be at least 6 characters long'),
    check('email')
    .isEmail().
    withMessage('email must be a string'),
    check('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({min: 6})
    .withMessage('password must be at least 6 characters long'),    
    validate
]

export const DeleteUser = [
    check('id').optional(),
    validate
]
