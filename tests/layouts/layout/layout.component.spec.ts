import { ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { screen, render, RenderResult } from '@testing-library/angular';
import { LayoutComponent } from '../../../src/app/layouts/layout/layout.component';

//#region Mocks
const menuMock = [
  // { icon: '', label: '', route: '' },
  // { icon: 'bi bi-building', label: 'brand name', route: './brand' },
  { icon: 'bi bi-house-door', label: 'dashboard', route: '/dashboard' },
  { icon: 'bi bi-person', label: 'contacts', route: '/contacts' },
  { icon: 'bi bi-chat', label: 'messages', route: '/messages' },
  { icon: 'bi bi-hourglass', label: 'history', route: '/history' },
  { icon: 'bi bi-gear', label: 'settings', route: '/settings' },
  { icon: 'bi bi-question-circle', label: 'help', route: '/help' },
  // { icon: 'bi bi-box-arrow-left', label: 'log out' },
];
//#endregion Mocks

describe('LayoutComponent', () => {
  let rendered: RenderResult<LayoutComponent>;
  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    rendered = await render(LayoutComponent, {
      imports: [RouterTestingModule],
    });
  });
  beforeEach(() => {
    fixture = rendered.fixture;
    component = rendered.fixture.componentInstance;
    compiled = rendered.fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Layout', () => {
    it('should create', () => {
      expect(compiled).toMatchSnapshot();
    });
    it('has a sidebar menu', () => {
      const sidebar = screen.getByRole('navigation', { name: 'sidebar' });
      expect(sidebar).toBeInTheDocument();
    });
    it('has inside the sidebar: brand, nav-items, logout', () => {
      const brand = screen.getByRole('button', {
        name: 'brand and sidebar toggle btn',
      });

      const dashboard = screen.getByText(/dashboard/i);
      const contacts = screen.getByText(/Contacts/i);
      const messages = screen.getByText(/Messages/i);
      const history = screen.getByText(/History/i);
      const settings = screen.getByText(/Settings/i);
      const help = screen.getByText(/Help/i);
      const logout = screen.getByText('Log out');

      expect(brand).toBeInTheDocument();
      expect(dashboard).toBeInTheDocument();
      expect(contacts).toBeInTheDocument();
      expect(messages).toBeInTheDocument();
      expect(history).toBeInTheDocument();
      expect(settings).toBeInTheDocument();
      expect(help).toBeInTheDocument();
      expect(logout).toBeInTheDocument();
    });
  });
  describe('Methods', () => {
    it('has logout', () => {
      expect(typeof component.logout).toBe('function');
    });
  });
});
