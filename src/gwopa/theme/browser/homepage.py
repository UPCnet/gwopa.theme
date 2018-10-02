from zope.interface import implements
from Products.Five import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFPlone.browser.interfaces import IMainTemplate
from plone import api


class MainTemplate(BrowserView):
    implements(IMainTemplate)

    main_template = ViewPageTemplateFile('templates/homepage.pt')

    def __call__(self):
        return self.template()

    @property
    def template(self):
        return self.main_template

    @property
    def macros(self):
        return self.template.macros

    def listProjects(self):
        projects = api.content.find(
            portal_type='Project',
            context=self.context)
        results = []
        for project in projects:
                item = project.getObject()
                if item.image:
                    image = True
                else:
                    image = False
                results.append(dict(title=item.id,
                                    url=item.absolute_url_path(),
                                    start=item.start,
                                    end=item.end,
                                    geolocation=item.geolocation,
                                    project_manager=item.project_manager,
                                    image=image
                                    ))
        # import ipdb; ipdb.set_trace()
        return results[:4]
