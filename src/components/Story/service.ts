import * as Joi from 'joi';
import StoryModel, { IStoryModel } from './model';
import { IStoryService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import { NextFunction, Request, Response } from 'express';
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @implements {IStoryService}
 */
const StoryService: IStoryService = {
    /**
     * @param {string} id
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async find(id: string): Promise <IStoryModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await StoryModel.find({
                story_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {Request} user
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async insert(req: Request): Promise < IStoryModel > {
        try {

            let data = [].concat(req.files);
            let image : Array<string> = []
            for (let entry of data) {
                image.push(entry.original.key)
            }

            const model : IStoryModel = new StoryModel({
                user_id : req.body['user_id'],
                title : req.body['title'],
                content : req.body['content'],
                cate_id : req.body['cate_id'],
                file : image ,
                tag : req.body['tag'], 
                related_content : req.body['related_content'],
                visible : req.body['visible']
            })

            const validate: Joi.ValidationResult < IStoryModel > = Validation.create(model.toObject());

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IStoryModel = await StoryModel.create(model);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async remove(id: string): Promise < IStoryModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IStoryModel = await StoryModel.updateOne({
                story_id : id    
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default StoryService;
