import { services } from '../shared/services/index.js';

const expand = [
  { key: 'trainer_id', name: 'trainer', endpoint: 'http://82.29.197.244:8080/employees' },
  { key: 'course_id', name: 'course', endpoint: 'http://82.29.197.244:8080/courses/courses' },
];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'event', query: req.query, expand, search: ['name', 'start_date', 'end_date'], filters: ['course_id', 'trainer_id'] });
  return services.response.send({ res, data, meta, message: 'the list of events has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'event', target: req.params.id, expand });
  if (!data) return services.response.send({ res, data, error: 'the event with the provided ID does not exist' });
  services.response.send({ res, data, message: 'event successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'event', payload: req.body, keys: ['name', 'start_date', 'end_date', 'course_id', 'trainer_id'] });
  return services.response.send({ res, data, message: 'event created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'event', id: req.params.id, payload: req.body, keys: ['name'] });
  return services.response.send({ res, data, message: 'event updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'event', id: req.params.id });
  return services.response.send({ res, data, message: 'event deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
