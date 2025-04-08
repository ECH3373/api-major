import axios from 'axios';
import { services } from '../shared/services/index.js';

const include = [{ key: 'event_id', name: 'event' }];
const expand = [{ key: 'employee_id', name: 'employee', endpoint: 'http://82.29.197.244:8080/employees' }];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'enrollment', query: req.query, expand, include, search: ['employee_id', 'event_id'], filters: ['employee_id', 'event_id'] });
  return services.response.send({ res, data, meta, message: 'the list of enrollments has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'enrollment', target: req.params.id, expand });
  if (!data) return services.response.send({ res, data, error: 'the enrollment with the provided ID does not exist' });
  services.response.send({ res, data, message: 'enrollment successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'enrollment', payload: req.body, keys: ['employee_id', 'event_id'] });
  return services.response.send({ res, data, message: 'enrollment created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'enrollment', id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'enrollment updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'enrollment', id: req.params.id });
  return services.response.send({ res, data, message: 'enrollment deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
