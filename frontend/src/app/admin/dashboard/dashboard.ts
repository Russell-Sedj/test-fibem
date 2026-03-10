import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiService, ActualiteRaw, DocumentApi } from '../../services/api.service';

const CATEGORY_STYLES: Record<string, { badge: string; bg: string }> = {
  Travaux: {
    badge: 'bg-orange-100 text-orange-700',
    bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
  },
  Éducation: {
    badge: 'bg-green-100 text-green-700',
    bg: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  Événement: {
    badge: 'bg-purple-100 text-purple-700',
    bg: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
  Institution: {
    badge: 'bg-blue-100 text-blue-700',
    bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
  },
  Environnement: {
    badge: 'bg-teal-100 text-teal-700',
    bg: 'bg-gradient-to-br from-teal-400 to-teal-600',
  },
  Autre: { badge: 'bg-gray-100 text-gray-700', bg: 'bg-gradient-to-br from-gray-400 to-gray-600' },
};

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styles: [],
})
export class AdminDashboard implements OnInit {
  activeTab: 'actualites' | 'documents' = 'actualites';
  categories = Object.keys(CATEGORY_STYLES);
  docCategories = ['Général', 'État civil', 'Urbanisme', 'Délibérations', 'Formulaires'];

  // Actualités
  actualites: ActualiteRaw[] = [];
  showActuForm = false;
  editingActu: ActualiteRaw | null = null;
  actuForm = { titre: '', description: '', categorie: 'Travaux', date: '' };
  actuLoading = false;
  actuError = '';

  // Documents
  documents: DocumentApi[] = [];
  showDocForm = false;
  docForm = { nom: '', description: '', categorie: 'Général' };
  selectedFile: File | null = null;
  docLoading = false;
  docError = '';

  globalError = '';

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadActualites();
    this.loadDocuments();
  }

  // ── Auth ──────────────────────────────────────────────────────
  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  // ── Actualités ────────────────────────────────────────────────
  loadActualites() {
    this.api.getActualitesRaw().subscribe({
      next: (data) => (this.actualites = data),
      error: () => (this.globalError = 'Impossible de charger les actualités'),
    });
  }

  openCreateActu() {
    this.editingActu = null;
    const today = new Date().toLocaleDateString('fr-SN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.actuForm = { titre: '', description: '', categorie: 'Travaux', date: today };
    this.actuError = '';
    this.showActuForm = true;
  }

  openEditActu(item: ActualiteRaw) {
    this.editingActu = item;
    this.actuForm = {
      titre: item.titre,
      description: item.description,
      categorie: item.categorie,
      date: item.date,
    };
    this.actuError = '';
    this.showActuForm = true;
  }

  saveActu() {
    if (!this.actuForm.titre || !this.actuForm.description || !this.actuForm.date) {
      this.actuError = 'Titre, description et date sont obligatoires';
      return;
    }
    this.actuLoading = true;
    this.actuError = '';
    const styles = CATEGORY_STYLES[this.actuForm.categorie] || CATEGORY_STYLES['Autre'];
    const payload = { ...this.actuForm, badge_class: styles.badge, bg_class: styles.bg };

    const obs = this.editingActu
      ? this.api.updateActualite(this.editingActu.id, payload)
      : this.api.createActualite(payload);

    obs.subscribe({
      next: () => {
        this.actuLoading = false;
        this.showActuForm = false;
        this.loadActualites();
      },
      error: (err) => {
        this.actuError = err.error?.message || 'Erreur lors de la sauvegarde';
        this.actuLoading = false;
      },
    });
  }

  deleteActu(id: number) {
    if (!confirm('Supprimer cette actualité ?')) return;
    this.api.deleteActualite(id).subscribe({
      next: () => this.loadActualites(),
      error: () => (this.globalError = 'Erreur lors de la suppression'),
    });
  }

  // ── Documents ─────────────────────────────────────────────────
  loadDocuments() {
    this.api.getDocuments().subscribe({
      next: (data) => (this.documents = data),
      error: () => {},
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  uploadDoc() {
    if (!this.selectedFile) {
      this.docError = 'Sélectionnez un fichier PDF';
      return;
    }
    if (!this.docForm.nom) {
      this.docError = 'Le nom est obligatoire';
      return;
    }
    this.docLoading = true;
    this.docError = '';
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('nom', this.docForm.nom);
    fd.append('description', this.docForm.description);
    fd.append('categorie', this.docForm.categorie);
    this.api.uploadDocument(fd).subscribe({
      next: () => {
        this.docLoading = false;
        this.showDocForm = false;
        this.docForm = { nom: '', description: '', categorie: 'Général' };
        this.selectedFile = null;
        this.loadDocuments();
      },
      error: (err) => {
        this.docError = err.error?.message || "Erreur lors de l'upload";
        this.docLoading = false;
      },
    });
  }

  deleteDoc(id: number) {
    if (!confirm('Supprimer ce document ?')) return;
    this.api.deleteDocument(id).subscribe({
      next: () => this.loadDocuments(),
      error: () => (this.globalError = 'Erreur lors de la suppression'),
    });
  }

  downloadDoc(id: number) {
    window.open(this.api.documentDownloadUrl(id), '_blank');
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  }
}
