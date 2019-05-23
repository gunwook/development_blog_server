import * as Joi from 'joi';
import HomeModel, { IHomeModel } from './model';
import { IHomeService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
import { NextFunction, Request, Response } from 'express';
import form from '../../config/utils/formidable'
import { logger } from '../../config/utils/logger';
import multer = require('multer');

/**
 * @implements {IHomeService}
 */
const HomeService: IHomeService = {
    /**
     * @param {string} id
     * @returns {Promise < IHomeModel >}
     */
    async find(id: string): Promise <IHomeModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await HomeModel.find({
                home_id : id    
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
            /*let model : IHomeModel = await new Promise(function (resolve ,reject){
               
                form.parse(req , (err , field , files) => {
                    if (err) {
                        reject(err);
                    }else {
                        console.log(field)
                        resolve(model);
                    }
                })
            })*/


            let data = [].concat(req.files);
            let backgroundimage = ''
            let image : Array<string> = []
            let bool = true
            for (let entry of data) {
                if (bool){
                    backgroundimage = entry.original.key
                    bool = false
                }else{
                    image.push(entry.original.key)
                }
            }
            
            const model = new HomeModel({
                user_id :  req.body['user_id'],
                backgroundimage : backgroundimage,
                title : req.body['title'],
                subtitle : req.body['subtitle'],
                conts : req.body['conts'],
                image : image,
                wisesaying : req.body['wisesaying'],
                visible : req.body['visible']
            })

            const validate: Joi.ValidationResult <IHomeModel> = Validation.create(model.toObject());

            if (validate.error) {
                throw new Error(validate.error.message);
            }


            const user: IHomeModel = await HomeModel.create(model)
            
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
                home_id : id    
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default HomeService;
