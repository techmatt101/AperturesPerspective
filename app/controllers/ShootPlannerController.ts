class ShootPlannerController {
    constructor() {
        loadView('Shoot Planner', Views.shootPlanner());

        document.getElementById('add').addEventListener('click', () => {
            loadView('Shoot Plan', Views.shootPlan());
        });
    }
}