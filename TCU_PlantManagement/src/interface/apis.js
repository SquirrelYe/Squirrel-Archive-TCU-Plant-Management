const req = require("../utils/axios");
export default {
  // 用户信息
  user: {
    delete(id) {
      return req.postParam("api/ent/user", { judge: 2, id: id });
    },
    update(id, c) {
      return req.postParam("api/ent/user", { judge: 3, id: id, condition: c });
    },
    updateType(id, t) {
      return req.postParam("api/ent/user", { judge: 3, id: id, type: t });
    },
    login(sid, p) {
      return req.postParam("api/ent/user", { judge: 4, stu_id: sid, pass: p });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/user", { judge: 0, offset: o, limit: l });
    },
  },
  // 档案清单
  list: {
    findAll() {
      return req.postParam("api/ent/list", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/list", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/list", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/list", { judge: 3, ...item });
    },
    findByRand(n) {
      return req.postParam("api/ent/list", { judge: 4, number: n });
    },
    count() {
      return req.postParam("api/ent/list", { judge: 6 });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/list", { judge: 0, offset: o, limit: l });
    },
    findAndCountAllByName(n, o, l) {
      return req.postParam("api/ass/list", {
        judge: 2,
        name: n,
        offset: o,
        limit: l,
      });
    },
    findAndCountAllByKind(k, o, l) {
      return req.postParam("api/ass/list", {
        judge: 3,
        kind_id: k,
        offset: o,
        limit: l,
      });
    },
  },
  // 类型清单
  kind: {
    findAll() {
      return req.postParam("api/ent/kind", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/kind", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/kind", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/kind", { judge: 3, ...item });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/kind", { judge: 0, offset: o, limit: l });
    },
  },
  // 植株清单
  plant: {
    findAll() {
      return req.postParam("api/ent/plant", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/plant", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/plant", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/plant", { judge: 3, ...item });
    },
    count() {
      return req.postParam("api/ent/plant", { judge: 5 });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/plant", { judge: 0, offset: o, limit: l });
    },
  },
  // 养护列表
  protect: {
    findAll() {
      return req.postParam("api/ent/protect", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/protect", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/protect", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/protect", { judge: 3, ...item });
    },
    count() {
      return req.postParam("api/ent/protect", { judge: 4 });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/protect", {
        judge: 0,
        offset: o,
        limit: l,
      });
    },
  },
  // 校园风景
  photo: {
    findAll() {
      return req.postParam("api/ent/photo", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/photo", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/photo", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/photo", { judge: 3, ...item });
    },
    count() {
      return req.postParam("api/ent/photo", { judge: 4 });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/photo", { judge: 0, offset: o, limit: l });
    },
  },
  // 用户反馈
  call: {
    findAll() {
      return req.postParam("api/ent/callback", { judge: 0 });
    },
    create(item) {
      return req.postParam("api/ent/callback", { judge: 1, ...item });
    },
    delete(id) {
      return req.postParam("api/ent/callback", { judge: 2, id: id });
    },
    update(item) {
      return req.postParam("api/ent/callback", { judge: 3, ...item });
    },

    findAndCountAll(o, l) {
      return req.postParam("api/ass/callback", {
        judge: 0,
        offset: o,
        limit: l,
      });
    },
    findOneById(id) {
      return req.postParam("api/ass/callback", { judge: 1, id: id });
    },
  },
};
