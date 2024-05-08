# Mon application TodoList

## Description
Cette application permet à l'utilisateur de gérer une liste de tâches. Les fonctionnalités principales comprennent l'ajout, la modification, la suppression, le marquage comme terminées et la restauration des tâches.

## Utilisation
Pour utiliser cette application, suivez les étapes suivantes :
1. Cloner ce dépôt.
2. Installer les dépendances en exécutant la commande `npm install`.
3. Lancer l'application en exécutant la commande `ng serve`.

## Composant TodoComponent

### Propriétés :
- `tasks: Task[]`: Un tableau contenant les tâches à faire.
- `tasksCompleted: Task[]`: Un tableau contenant les tâches terminées.
- `modalOpen: boolean`: Un indicateur indiquant si le modal est ouvert ou fermé.
- `currentItem: any`: La tâche actuellement sélectionnée ou en cours d'édition.
- `taskForm: FormGroup`: Un formulaire réactif pour ajouter ou modifier une tâche.
- `submitted: boolean`: Un indicateur indiquant si le formulaire a été soumis.
- `editingTask: Task`: La tâche en cours d'édition.

### Méthodes :
- `ngOnInit()`: Méthode du cycle de vie Angular appelée après que le composant a été initialisé.
- `addOrUpdateTask()`: Ajoute une nouvelle tâche ou met à jour une tâche existante selon que `editingTask` est défini ou non.
- `markAsDone(task: Task)`: Marque une tâche comme terminée et la déplace vers `tasksCompleted`.
- `restaureTask(task: Task)`: Restaure une tâche terminée et la déplace vers `tasks`.
- `deleteTaskComplete(task: Task)`: Supprime une tâche terminée de `tasksCompleted`.
- `deleteTask(task: Task)`: Supprime une tâche de `tasks`.
- `openModal(task?: Task)`: Ouvre le modal pour ajouter ou modifier une tâche. Si une tâche est fournie, le formulaire est pré-rempli avec les détails de cette tâche pour l'édition.
- `closeModal()`: Ferme le modal.
- `description`: Getter pour accéder au contrôle description du formulaire.
- `date`: Getter pour accéder au contrôle date du formulaire.

### Dépendances :
- `CommonModule`: Module Angular pour les fonctionnalités communes.
- `ReactiveFormsModule`: Module Angular pour la création de formulaires réactifs.
- `FormsModule`: Module Angular pour la liaison de données bidirectionnelle avec `ngModel`.
