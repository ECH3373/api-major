import { services } from '../shared/services/index.js';

const expand = [{ key: 'employee_id', name: 'employee', endpoint: 'https://gateway.stullerlandcommunity.com/employees' }, { key: 'resource_id', name: 'resource', endpoint: 'https://gateway.stullerlandcommunity.com/courses/resources' }];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'piece', query: req.query, expand, filters: ['resource_id', 'employee_id'] });
  return services.response.send({ res, data, meta, message: 'the list of pieces has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'piece', target: req.params.id, expand });
  if (!data) return services.response.send({ res, data, error: 'the piece with the provided ID does not exist' });
  services.response.send({ res, data, message: 'piece successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'piece', payload: req.body, keys: ['resource_id', 'employee_id'] });
  return services.response.send({ res, data, message: 'piece created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'piece', id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'piece updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'piece', id: req.params.id });
  return services.response.send({ res, data, message: 'piece deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
