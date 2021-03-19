const db = require("../../data/db-config");

function find() {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.*")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id");
}

async function findById(scheme_id) {
  let schemes = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select(
      "  sc.scheme_id",
      "st.step_id",
      "st.step_number",
      " st.instructions",
      "sc.scheme_name"
    )
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number");
  if (schemes.length === 0) return schemes;
  else {
    let newSteps;
    if (!schemes[0].step_id) newSteps = [];
    else {
      newSteps = schemes.map((scheme) => {
        return {
          step_id: scheme.step_id,
          step_number: scheme.step_number,
          instructions: scheme.instructions,
        };
      });
    }
    const modifiedScheme = {
      scheme_id: schemes[0].scheme_id,
      scheme_name: schemes[0].scheme_name,
      steps: newSteps,
    };
    return modifiedScheme;
  }
}

async function findSteps(scheme_id) {
  const scheme = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select(
      "st.step_id",
      "st.step_number",
      " st.instructions",
      "sc.scheme_name"
    )
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number");
  if (!scheme[0].step_id) return [];
  else return scheme;
}

async function add(scheme) {
  const newSchemeID = await db("schemes").insert(scheme);
  return findById(newSchemeID);
}

async function addStep(scheme_id, step) {
  const newStep = {
    instructions: step.instructions,
    step_number: step.step_number,
    scheme_id: scheme_id,
  };
  await db("steps").insert(newStep);
  return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
