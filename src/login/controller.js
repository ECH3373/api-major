import { services } from '../shared/services/index.js';

const index = async (req, res) => {
  const { data, meta } = await services.crud.index({ model: 'login', query: req.query, });
  return services.response.send({ res, data, meta, message: 'the list of logins has been successfully retrieved' });
};

const show = async (req, res) => {
  const data = await services.crud.show({ model: 'login', target: req.params.id, });
  if (!data) return services.response.send({ res, data, error: 'the login with the provided ID does not exist' });
  services.response.send({ res, data, message: 'login successfully retrieved' });
};

const store = async (req, res) => {
  const data = await services.crud.store({ model: 'login', payload: req.body, keys: ['url'] });
  return services.response.send({ res, data, message: 'login created successfully' });
};

const update = async (req, res) => {
  const data = await services.crud.update({ model: 'login', id: req.params.id, payload: req.body, });
  return services.response.send({ res, data, message: 'login updated successfully' });
};

const destroy = async (req, res) => {
  const data = await services.crud.destroy({ model: 'login', id: req.params.id });
  return services.response.send({ res, data, message: 'login deleted successfully' });
};

export const controller = {
  index,
  show,
  store,
  update,
  destroy,
};
