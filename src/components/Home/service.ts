import * as Joi from 'joi';
import HomeModel, { IHomeModel } from './model';
import { IHomeService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
import { NextFunction, Request, Response } from 'express';
import form from '../../config/utils/formidable'
import { logger } from '../../config/utils/logger';
import {concat} from 'lodash'

/**
 * @implements {IHomeService}
 */
const HomeService: IHomeService = {
    /**
     * @param {string} id
     * @returns {Promise < IHomeModel >}
     */
    async find(id: string): Promise <IHomeModel> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await HomeModel.findOne({
                user_id : id    
            });
        } catch (error) {
            logger.info(error.message)
            throw new Error(error.message);
        }
    },

    /**
     * @param {IHomeModel} user
     * @returns {Promise < IHomeModel >}
     */
    async insert(req: Request): Promise < IHomeModel > {
        try {
            const model = {
                user_id :  req.body['user_id'],
                title : req.body['title'],
                subtitle : req.body['subtitle'],
                conts : req.body['conts'],
                wisesaying : req.body['wisesaying'],
                visible : req.body['visible']
            }

            const validate: Joi.ValidationResult <any> = Validation.create(model);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IHomeModel = await HomeModel.update({user_id:  req.body['user_id']},model,{upsert : true})
            return user
        } catch (error) {
            logger.info(error.message)
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IHomeModel >}
     */
    async remove(id: string): Promise < IHomeModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IHomeModel = await HomeModel.updateOne({
                user_id : id    
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },


    /**
     * @param {Request} request
     * @returns {Promise < IHomeModel >}
     */
    async upload(req: Request): Promise < IHomeModel > {
        try {
            let data = [].concat(req.files);
            let image : Array<string> = []
            for (let entry of data) {
                image.push(entry.original.key)
            }
            
            const validate: Joi.ValidationResult <Array<string>> = Validation.upload(image);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IHomeModel = await HomeModel.findOne({
                user_id: req.body['user_id']
            });

            const model = {
                user_id : req.body['user_id'],
                image : concat(query.image,image)
            }
            
            const user: IHomeModel = await HomeModel.updateOne({user_id:  req.body['user_id']},model,{upsert : true})
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default HomeService;
