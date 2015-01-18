/// <reference path="../components/Activity"/>

class ShootPlannerController extends Activity {
    create() {
        new ActionBar('Shoot Planner');
        this.setView(Views.shootPlanner());

        document.getElementById('add').addEventListener('click', () => {
            this.setView(Views.shootPlan());
        });
    }
}