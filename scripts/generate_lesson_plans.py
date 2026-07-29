"""
Renders each entry in lesson_plans_data.LESSON_PLANS to a branded PDF under
public/lesson-plans/{slug}.pdf.

Run with: python3 scripts/generate_lesson_plans.py
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    ListFlowable, ListItem, HRFlowable, NextPageTemplate, PageBreak, KeepTogether,
)
from reportlab.platypus.flowables import Flowable

from lesson_plans_data import LESSON_PLANS

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "lesson-plans")
os.makedirs(OUT_DIR, exist_ok=True)

# Brand palette (matches src/app/globals.css)
INK_950 = colors.HexColor("#14121f")
INK_900 = colors.HexColor("#201d2e")
INK_700 = colors.HexColor("#3a3560")
GOLD_500 = colors.HexColor("#c4913a")
GOLD_600 = colors.HexColor("#a9762a")
PARCHMENT_100 = colors.HexColor("#faf7f0")
PARCHMENT_200 = colors.HexColor("#f3ecdc")
WHITE = colors.white
GRAY_TEXT = colors.HexColor("#4b4560")

PAGE_W, PAGE_H = LETTER
MARGIN = 0.75 * inch
BAND_HEIGHT = 1.15 * inch


class ColorBand(Flowable):
    """A full-bleed colored rectangle used as the page header band, drawn once
    per page via the page template's onPage hook instead (see draw_header)."""
    pass


def draw_header(canvas, doc):
    canvas.saveState()
    # Full-width top band
    canvas.setFillColor(INK_950)
    canvas.rect(0, PAGE_H - BAND_HEIGHT, PAGE_W, BAND_HEIGHT, stroke=0, fill=1)

    # Logo mark (circle + "PC")
    canvas.setFillColor(GOLD_500)
    canvas.circle(MARGIN + 0.22 * inch, PAGE_H - BAND_HEIGHT / 2, 0.22 * inch, stroke=0, fill=1)
    canvas.setFillColor(INK_950)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawCentredString(MARGIN + 0.22 * inch, PAGE_H - BAND_HEIGHT / 2 - 4, "PC")

    # Site name
    canvas.setFillColor(WHITE)
    canvas.setFont("Times-Bold", 15)
    canvas.drawString(MARGIN + 0.55 * inch, PAGE_H - BAND_HEIGHT / 2 - 2, "Philosophy Commons")

    # "Inspired Lesson Plan" pill, right-aligned
    pill_text = "INSPIRED LESSON PLAN"
    canvas.setFont("Helvetica-Bold", 8.5)
    text_width = canvas.stringWidth(pill_text, "Helvetica-Bold", 8.5)
    pill_w = text_width + 22
    pill_h = 20
    pill_x = PAGE_W - MARGIN - pill_w
    pill_y = PAGE_H - BAND_HEIGHT / 2 - pill_h / 2
    canvas.setFillColor(GOLD_500)
    canvas.roundRect(pill_x, pill_y, pill_w, pill_h, 10, stroke=0, fill=1)
    canvas.setFillColor(INK_950)
    canvas.drawCentredString(pill_x + pill_w / 2, pill_y + 6, pill_text)

    # Footer rule + page number
    canvas.setStrokeColor(colors.HexColor("#d8d0c0"))
    canvas.setLineWidth(0.75)
    canvas.line(MARGIN, 0.55 * inch, PAGE_W - MARGIN, 0.55 * inch)
    canvas.setFillColor(GRAY_TEXT)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN, 0.38 * inch, "philosophycommons.vercel.app")
    canvas.drawRightString(PAGE_W - MARGIN, 0.38 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build_styles():
    styles = {}
    styles["Title"] = ParagraphStyle(
        "LPTitle", fontName="Times-Bold", fontSize=20, leading=25,
        textColor=INK_950, spaceAfter=6, spaceBefore=0,
    )
    styles["Attribution"] = ParagraphStyle(
        "Attribution", fontName="Helvetica-Oblique", fontSize=9.5, leading=13,
        textColor=GRAY_TEXT, spaceAfter=14,
    )
    styles["MetaLabel"] = ParagraphStyle(
        "MetaLabel", fontName="Helvetica-Bold", fontSize=8, leading=10,
        textColor=GOLD_600,
    )
    styles["MetaValue"] = ParagraphStyle(
        "MetaValue", fontName="Helvetica", fontSize=9.5, leading=12,
        textColor=INK_900,
    )
    styles["SectionHeading"] = ParagraphStyle(
        "SectionHeading", fontName="Times-Bold", fontSize=13, leading=16,
        textColor=INK_950, spaceBefore=14, spaceAfter=6,
    )
    styles["Body"] = ParagraphStyle(
        "Body", fontName="Helvetica", fontSize=9.7, leading=14,
        textColor=INK_900, spaceAfter=4,
    )
    styles["BodyBold"] = ParagraphStyle(
        "BodyBold", parent=styles["Body"], fontName="Helvetica-Bold",
    )
    styles["EssentialQuestion"] = ParagraphStyle(
        "EssentialQuestion", fontName="Times-Italic", fontSize=12, leading=17,
        textColor=INK_950,
    )
    styles["StepName"] = ParagraphStyle(
        "StepName", fontName="Helvetica-Bold", fontSize=10, leading=13,
        textColor=INK_950,
    )
    styles["StepMinutes"] = ParagraphStyle(
        "StepMinutes", fontName="Helvetica-Bold", fontSize=9, leading=13,
        textColor=GOLD_600, alignment=TA_CENTER,
    )
    styles["Footer"] = ParagraphStyle(
        "Footer", fontName="Helvetica", fontSize=8.3, leading=12,
        textColor=GRAY_TEXT,
    )
    return styles


def essential_question_box(text, styles):
    p = Paragraph(f"“{text}”", styles["EssentialQuestion"])
    t = Table([[p]], colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PARCHMENT_200),
        ("BOX", (0, 0), (-1, -1), 1, GOLD_500),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


def bullet_list(items, styles, bullet_char="•"):
    return ListFlowable(
        [ListItem(Paragraph(item, styles["Body"]), spaceAfter=4) for item in items],
        bulletType="bullet", bulletChar=bullet_char, leftIndent=14, bulletFontSize=9,
        bulletColor=GOLD_600,
    )


def numbered_list(items, styles):
    return ListFlowable(
        [ListItem(Paragraph(item, styles["Body"]), spaceAfter=6) for item in items],
        bulletType="1", leftIndent=14, bulletFontSize=9.5, bulletColor=GOLD_600,
    )


def build_story(lesson, styles):
    story = []

    story.append(Paragraph(lesson["title"], styles["Title"]))
    # Some inspired_course phrasings already name the institution (e.g. "the
    # Stanford Encyclopedia of Philosophy entry on X") — skip the parenthetical
    # repeat in that case.
    institution_already_named = lesson["inspired_institution"].lower() in lesson["inspired_course"].lower()
    course_phrase = (
        f"<i>{lesson['inspired_course']}</i>"
        if institution_already_named
        else f"<i>{lesson['inspired_course']}</i> ({lesson['inspired_institution']})"
    )
    attribution = (
        f"An original lesson plan inspired by <b>{lesson['inspired_author']}</b>'s "
        f"{course_phrase}. "
        f"Not affiliated with or endorsed by {lesson['inspired_institution']} or "
        f"{lesson['inspired_author']}. Explore the original course: {lesson['inspired_url']}"
    )
    story.append(Paragraph(attribution, styles["Attribution"]))

    meta_table = Table(
        [[
            Paragraph("GRADE LEVEL", styles["MetaLabel"]),
            Paragraph("DURATION", styles["MetaLabel"]),
            Paragraph("TOPICS", styles["MetaLabel"]),
        ], [
            Paragraph(lesson["grade_level"], styles["MetaValue"]),
            Paragraph(lesson["duration"], styles["MetaValue"]),
            Paragraph(lesson["topics"], styles["MetaValue"]),
        ]],
        colWidths=[(PAGE_W - 2 * MARGIN) / 3.0] * 3,
    )
    meta_table.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, 0), 1, colors.HexColor("#e5ddc8")),
        ("LINEBELOW", (0, 1), (-1, 1), 1, colors.HexColor("#e5ddc8")),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    story.append(essential_question_box(lesson["essential_question"], styles))
    story.append(Spacer(1, 4))

    story.append(Paragraph("Learning Objectives", styles["SectionHeading"]))
    story.append(Paragraph("By the end of this lesson, students will be able to:", styles["Body"]))
    story.append(bullet_list(lesson["objectives"], styles))

    story.append(Paragraph("Materials Needed", styles["SectionHeading"]))
    story.append(bullet_list(lesson["materials"], styles))

    story.append(Paragraph("Lesson Procedure", styles["SectionHeading"]))
    for step in lesson["procedure"]:
        row = Table(
            [[
                Paragraph(step["name"], styles["StepName"]),
                Paragraph(f"{step['minutes']} min", styles["StepMinutes"]),
            ]],
            colWidths=[PAGE_W - 2 * MARGIN - 0.9 * inch, 0.9 * inch],
        )
        row.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BACKGROUND", (1, 0), (1, 0), PARCHMENT_200),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ("LEFTPADDING", (1, 0), (1, 0), 6),
        ]))
        story.append(KeepTogether([
            row,
            Spacer(1, 3),
            Paragraph(step["description"], styles["Body"]),
            Spacer(1, 8),
        ]))

    story.append(Paragraph("Discussion Questions", styles["SectionHeading"]))
    story.append(numbered_list(lesson["discussion_questions"], styles))

    story.append(Paragraph("Assessment", styles["SectionHeading"]))
    story.append(Paragraph(lesson["assessment"], styles["Body"]))

    story.append(Paragraph("Extension Activity", styles["SectionHeading"]))
    story.append(Paragraph(lesson["extension"], styles["Body"]))

    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#d8d0c0")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Free to use, adapt, and share for educational purposes with attribution to "
        "Philosophy Commons. This lesson plan is an original work created by Philosophy "
        "Commons; it is inspired by, but is not a reproduction of, the credited course's "
        "actual materials.",
        styles["Footer"],
    ))

    return story


def render(lesson):
    slug = lesson["slug"]
    path = os.path.join(OUT_DIR, f"{slug}.pdf")
    styles = build_styles()

    doc = BaseDocTemplate(
        path, pagesize=LETTER,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=BAND_HEIGHT + 0.35 * inch, bottomMargin=0.75 * inch,
        title=lesson["title"], author="Philosophy Commons",
    )
    frame = Frame(
        MARGIN, doc.bottomMargin, PAGE_W - 2 * MARGIN,
        PAGE_H - doc.topMargin - doc.bottomMargin, id="normal",
    )
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_header)])

    story = build_story(lesson, styles)
    doc.build(story)
    print(f"wrote {path}")


if __name__ == "__main__":
    for lesson in LESSON_PLANS:
        render(lesson)
