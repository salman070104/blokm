with open('style.css', 'r') as f:
    css = f.read()

responsive_css = """
    /* Main Layout Fixes for Mobile */
    .hero-section {
        padding-top: 100px;
    }

    .hero-inner {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .hero-buttons {
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }

    .hero-buttons .btn-primary, 
    .hero-buttons .btn-outline {
        width: 100%;
        text-align: center;
        justify-content: center;
    }

    .hero-photos {
        height: auto;
        aspect-ratio: 1;
    }

    .featured-grid,
    .team-grid,
    .paket-grid {
        grid-template-columns: 1fr !important;
    }
    
    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }

    .about-grid, 
    .contact-grid {
        grid-template-columns: 1fr;
    }

    .footer-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .footer-socials {
        justify-content: center;
    }
    
    .footer-brand .logo-img {
        margin: 0 auto 1.2rem;
    }
"""

# Insert responsive_css right before the closing brace of the media query.
# We know the media query ends with:
#    .header-right > .lang-toggle-btn {
#        display: none !important;
#    }
# }

target = """    .header-right > .lang-toggle-btn {
        display: none !important;
    }"""

css = css.replace(target, target + "\n" + responsive_css)

with open('style.css', 'w') as f:
    f.write(css)

print("Responsive CSS added.")
