import { provider } from "../services/provider.service";

let network = null;

export const getModel = async () => {
  if (network) {
    return network;
  }
  const _network = await provider.getNetwork();
  network = _network;

  return _network;
};
