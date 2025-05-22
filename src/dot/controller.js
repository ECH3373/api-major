import { services } from '../shared/services/index.js';

const expand = [{ key: 'employee_id', name: 'employee', endpoint: 'https://gateway.stullerlandcommunity.com/employees' }, { key: 'resource_id', name: 'resource', endpoint: 'https://gateway.stullerlandcommunity.com/courses/resources' }];

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'dot', query: req.query, expand, filters: ['defect_id', 'piece_id'] });
  return services.response.send({ res, data, meta, message: 'the list of dots has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'dot', target: req.params.id, expand });
  if (!data) return services.response.send({ res, data, error: 'the dot with the provided ID does not exist' });
  services.response.send({ res, data, message: 'dot successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'dot', payload: req.body, keys: ['position_x', 'position_y', 'defect_id', 'piece_id'] });
  return services.response.send({ res, data, message: 'dot created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'dot', id: req.params.id, payload: req.body });
  return services.response.send({ res, data, message: 'dot updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'dot', id: req.params.id });
  return services.response.send({ res, data, message: 'dot deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
