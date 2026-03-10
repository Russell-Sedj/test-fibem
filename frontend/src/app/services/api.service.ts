import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../admin/auth.service';

export interface Actualite {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  date: string;
  badgeClass: string;
  bgClass: string;
}

export interface ActualiteRaw {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  date: string;
  badge_class: string;
  bg_class: string;
  created_at: string;
}

export interface DocumentApi {
  id: number;
  nom: string;
  description: string;
  categorie: string;
  filename: string;
  size: number;
  created_at: string;
}

export interface Conseiller {
  id: number;
  nom: string;
  role: string;
  responsabilite: string;
  ordre: number;
}

export interface Service {
  id: number;
  titre: string;
  description: string;
  details: string[];
  bgIcon: string;
  iconColor: string;
  borderColor: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  private get authHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  // â”€â”€ Contact â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  sendContact(data: { nom: string; email: string; sujet: string; message: string }) {
    return this.http.post<{ message: string }>(`${this.base}/contact`, data);
  }

  // â”€â”€ ActualitÃ©s (public â€” camelCase pour les templates) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  getActualites() {
    return this.http.get<ActualiteRaw[]>(`${this.base}/actualites`).pipe(
      map((rows) =>
        rows.map((r) => ({
          id: r.id,
          titre: r.titre,
          description: r.description,
          categorie: r.categorie,
          date: r.date,
          badgeClass: r.badge_class,
          bgClass: r.bg_class,
        })),
      ),
    );
  }

  // â”€â”€ ActualitÃ©s (admin â€” snake_case brut) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  getActualitesRaw() {
    return this.http.get<ActualiteRaw[]>(`${this.base}/actualites`);
  }

  createActualite(data: Partial<ActualiteRaw>) {
    return this.http.post<ActualiteRaw>(`${this.base}/actualites`, data, {
      headers: this.authHeaders,
    });
  }

  updateActualite(id: number, data: Partial<ActualiteRaw>) {
    return this.http.put<ActualiteRaw>(`${this.base}/actualites/${id}`, data, {
      headers: this.authHeaders,
    });
  }

  deleteActualite(id: number) {
    return this.http.delete(`${this.base}/actualites/${id}`, {
      headers: this.authHeaders,
    });
  }

  // â”€â”€ Documents (public â€” tÃ©lÃ©chargement seulement) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  documentDownloadUrl(id: number) {
    return `${this.base}/documents/${id}/download`;
  }

  // â”€â”€ Conseillers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  getConseillers() {
    return this.http.get<Conseiller[]>(`${this.base}/conseillers`);
  }

  createConseiller(data: Partial<Conseiller>) {
    return this.http.post<Conseiller>(`${this.base}/conseillers`, data, {
      headers: this.authHeaders,
    });
  }

  updateConseiller(id: number, data: Partial<Conseiller>) {
    return this.http.put<Conseiller>(`${this.base}/conseillers/${id}`, data, {
      headers: this.authHeaders,
    });
  }

  deleteConseiller(id: number) {
    return this.http.delete(`${this.base}/conseillers/${id}`, {
      headers: this.authHeaders,
    });
  }

  // ── Services ──────────────────────────────────────────────────
  getServices() {
    return this.http.get<Service[]>(`${this.base}/services`);
  }

  createService(data: Partial<Service>) {
    return this.http.post<Service>(`${this.base}/services`, data, {
      headers: this.authHeaders,
    });
  }

  updateService(id: number, data: Partial<Service>) {
    return this.http.put<Service>(`${this.base}/services/${id}`, data, {
      headers: this.authHeaders,
    });
  }

  deleteService(id: number) {
    return this.http.delete(`${this.base}/services/${id}`, {
      headers: this.authHeaders,
    });
  }
}
