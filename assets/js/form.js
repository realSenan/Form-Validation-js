export const formConfig = (configs) => {
  configs.forEach((cfg) => {
    const formEl =
      typeof cfg.form === "string"
        ? document.querySelector(cfg.form)
        : cfg.form;

    if (!formEl) throw new Error("Form is not defined");

    const getInp = (name) => formEl.querySelector(`[name="${name}"`);
    const getWrapper = (name) => getInp(name).closest(".field");
    const getErrEl = (name) => formEl.querySelector(`[id="${name}-error"]`);

    const showFieldError = (name, msg) => {
      getWrapper(name).classList.add("error");
      getErrEl(name).textContent = msg;
    };

    const clearFieldError = (name) => {
      getWrapper(name).classList.remove("error");
    };

    const getValues = () => {
      const data = {};
      new FormData(formEl).forEach((v, k) => (data[k] = v));
      return data;
    };

    const validateField = (name, value) => {
      let msg;
      for (const rule of cfg.rules[name]) {
        msg = rule(value);
        if (msg) break;
      }
      return msg;
    };

    const updateFieldError = (name, value) => {
      const errMsg = validateField(name, value);
      if (errMsg) {
        showFieldError(name, errMsg);
      } else {
        clearFieldError(name);
      }
    };

    const validateFieldAll = () => {
      const values = getValues();
      Object.keys(cfg.rules).forEach((name) =>
        updateFieldError(name, values[name])
      );
    };

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      validateFieldAll();
      // Bu kisimdan sonrasini kodu okuyup anlayarak hallede bilirsiniz. Kucuk bir task)
    });

    Object.keys(cfg.rules).forEach((name) => {
      getInp(name).addEventListener("blur", (e) =>
        updateFieldError(name, e.target.value)
      );
    });
  });
};
